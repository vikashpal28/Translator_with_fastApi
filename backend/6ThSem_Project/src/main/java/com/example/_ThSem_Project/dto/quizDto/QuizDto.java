package com.example._ThSem_Project.dto.quizDto;

import java.util.List;

public record QuizDto(
        Integer Id,
        String Question,
        List<String> Options,
        String correctAnswer
) {
}
