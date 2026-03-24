package com.example._ThSem_Project.dto.quizDto;

public record QuizSubmissionResponse(
        Integer score,
        Integer currentStreak,
        Integer longestStreak
) {
}
