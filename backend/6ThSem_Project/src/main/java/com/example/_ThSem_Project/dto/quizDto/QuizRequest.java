package com.example._ThSem_Project.dto.quizDto;

public record QuizRequest(
        String language,
        String topic,
        String level,
        Integer noOfQuestion
) {
}
