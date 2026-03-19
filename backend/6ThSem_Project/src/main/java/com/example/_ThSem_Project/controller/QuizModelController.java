package com.example._ThSem_Project.controller;


import com.example._ThSem_Project.dto.UserStatsResponse;
import com.example._ThSem_Project.dto.quizDto.QuizDto;
import com.example._ThSem_Project.dto.quizDto.QuizRequest;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionResponse;
import com.example._ThSem_Project.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizModelController {

    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<List<QuizDto>> generateLanguageQuiz(
            @RequestBody QuizRequest request){
        return ResponseEntity.ok(quizService.generateQuestions(request.language(), request.topic(), request.level() , request.noOfQuestion()));
    }

    @PostMapping("/submit")
    public ResponseEntity<UserStatsResponse> submitAnswer(@RequestBody QuizSubmissionResponse response){
        return ResponseEntity.ok(quizService.submitAnswer(response));
    }
}
