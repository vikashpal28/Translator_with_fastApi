package com.example._ThSem_Project.dto.quizDto;

import java.util.List;

public record QuizDto(
        Integer questionId,
        String question,
        List<String> options,
        String correctAnswer
) {
}
