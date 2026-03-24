package com.example._ThSem_Project.services;

import com.example._ThSem_Project.dto.quizDto.QuizDto;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionRequest;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionResponse;

import java.util.List;

public interface QuizService {
    List<QuizDto> generateQuestions(String language, String topic, String level, Integer noOfQuestion );



    QuizSubmissionResponse submitAnswer(Long questionId, String selectedAnswer);

    ;
}
