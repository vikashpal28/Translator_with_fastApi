package com.example._ThSem_Project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignUpRequest(
        @NotBlank @Size(min = 2, max = 50) String name,
        @NotBlank @Email String username,
        @NotBlank @Size(min = 6) String password
) {}
