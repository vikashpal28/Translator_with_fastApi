package com.example._ThSem_Project.dto;

public record LeaderboardResponse(
        String name,
        Integer currentStreak,
        Integer score
) {
}
