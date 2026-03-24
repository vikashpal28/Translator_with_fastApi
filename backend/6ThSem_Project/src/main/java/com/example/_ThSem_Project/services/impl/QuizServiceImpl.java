package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.dto.quizDto.QuizDto;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionRequest;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionResponse;
import com.example._ThSem_Project.entity.User;
import com.example._ThSem_Project.error.ResourceNotFoundException;
import com.example._ThSem_Project.repository.UserRepository;
import com.example._ThSem_Project.security.AuthUtil;
import com.example._ThSem_Project.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final ChatClient chatClient;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;


    // In-memory cache: questionId → QuizDto
    private final Map<Long, QuizDto> quizCache = new ConcurrentHashMap<Long, QuizDto>();

    @Override
    public List<QuizDto> generateQuestions(String language, String topic, String level, Integer noOfQuestion) {
        List<QuizDto> questions = chatClient.prompt()
                .system(s -> s.text("""
                        You are a fun language learning assistant for a gamified app.
                                        Generate exactly {noOfQuestion} engaging multiple-choice questions for someone learning {language}.
                                        Topic: {topic} | Difficulty: {level}.
                                        Focus on practical conversation. Make the options tricky but fair.
                                        Return the result as a JSON list of QuizDto objects.
                        """)
                        .param("language", language)
                        .param("topic", topic)
                        .param("level", level)
                        .param("noOfQuestion", noOfQuestion)
                ) // your LLM prompt
                .call()
                .entity(new ParameterizedTypeReference<List<QuizDto>>() {});

        // Store questions in memory
        questions.forEach(q -> quizCache.put(Long.valueOf(q.questionId()), q));
        return questions;
    }

    @Override
    public QuizSubmissionResponse submitAnswer(Long questionId, String selectedAnswer) {
        Long userId = authUtil.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", userId.toString()));

        QuizDto quiz = quizCache.get(questionId);
        if (quiz == null) {
            throw new ResourceNotFoundException("Question not found", questionId.toString());
        }

        boolean isCorrect = quiz.correctAnswer().equalsIgnoreCase(selectedAnswer);

        if (isCorrect) {
            user.setScore(user.getScore() + 10);
            user.setCurrentStreak(user.getCurrentStreak() + 1);
            if (user.getCurrentStreak() > user.getLongestStreak()) {
                user.setLongestStreak(user.getCurrentStreak());
            }
        } else {
            user.setCurrentStreak(0);
        }

        userRepository.save(user);

        return new QuizSubmissionResponse(user.getScore(), user.getCurrentStreak(), user.getLongestStreak());
    }
}
