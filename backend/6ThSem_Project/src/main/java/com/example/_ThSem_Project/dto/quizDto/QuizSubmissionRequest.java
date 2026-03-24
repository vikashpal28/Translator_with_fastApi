package com.example._ThSem_Project.dto.quizDto;


public record QuizSubmissionRequest(
        Long questionId,
        String selectedAnswer
) {
}
