package com.example._ThSem_Project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserProfileResponse(
        Long id , @Email @NotBlank String username , String name ,
        Integer score ,
        Integer currentStreak,
        Integer longestStreak
) {
}
