package com.example._ThSem_Project.error;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.List;

public record ApiError(
        HttpStatus status,
        String message,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
        Instant timestamp,

        @JsonInclude(JsonInclude.Include.NON_NULL)
        List<ApiFieldError> errors
) {
    // Constructor for simple messages (no field-specific errors)
    public ApiError(HttpStatus status, String message) {
        this(status, message, Instant.now(), null);
    }

    // Constructor for validation errors
    public ApiError(HttpStatus status, String message, List<ApiFieldError> errors) {
        this(status, message, Instant.now(), errors);
    }
}

record ApiFieldError(String field, String message) {}