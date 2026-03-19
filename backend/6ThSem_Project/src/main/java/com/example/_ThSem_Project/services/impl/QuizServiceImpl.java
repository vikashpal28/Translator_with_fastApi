package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.dto.UserStatsResponse;
import com.example._ThSem_Project.dto.quizDto.QuizDto;
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

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final ChatClient chatClient;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;


    @Override
    public List<QuizDto> generateQuestions(String language, String topic, String level, Integer noOfQuestion) {
        return chatClient.prompt()
                .system(s -> s.text("""
                    You are a fun language learning assistant for a gamified app.
                    Create noOfQuestion: {noOfQuestion} engaging multiple-choice questions for someone learning {language}.
                    Topic: {topic} | Difficulty: {level}.
                    Focus on practical conversation. Make the options tricky but fair.
                    """)
                        .param("language", language)
                        .param("topic", topic)
                        .param("level", level)
                        .param("noOfQuestion" , noOfQuestion)
                )
                .call()
                .entity(new ParameterizedTypeReference<List<QuizDto>>() {});
    }

    @Override
    public UserStatsResponse submitAnswer(QuizSubmissionResponse response) {
       Long userId = authUtil.getCurrentUserId();

        User user = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("user is not found by this" , userId.toString()));

        if(response.isCorrect()){
            // if correct answer than increased by 10
            user.setScore(user.getScore()+10);

            user.setCurrentStreak(user.getCurrentStreak()+1);

            if(user.getCurrentStreak() > user.getLongestStreak()){
                user.setLongestStreak(user.getCurrentStreak());
            }
        }
        else{
            user.setCurrentStreak(0);
        }
        userRepository.save(user);

        return new UserStatsResponse(user.getScore(), user.getCurrentStreak(), user.getLongestStreak());
    }
}
