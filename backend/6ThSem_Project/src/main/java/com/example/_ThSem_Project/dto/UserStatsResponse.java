package com.example._ThSem_Project.dto;

public record UserStatsResponse(
        Integer score,
        Integer currentStreak,
        Integer LongestStreak
) {
}
