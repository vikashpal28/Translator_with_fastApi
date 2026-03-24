package com.example._ThSem_Project.controller;


import com.example._ThSem_Project.dto.quizDto.QuizDto;
import com.example._ThSem_Project.dto.quizDto.QuizSubmissionRequest;
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
            @RequestParam String language,
            @RequestParam String topic,
            @RequestParam String level,
            @RequestParam Integer noOfQuestion){
        return ResponseEntity.ok(quizService.generateQuestions(language , topic , level , noOfQuestion));
    }

    @PutMapping("/submit")
    public ResponseEntity<QuizSubmissionResponse> submitAnswer(
            @RequestBody QuizSubmissionRequest response
    ){
        return ResponseEntity.ok(quizService.submitAnswer(response.questionId(),  response.selectedAnswer()));
    }
}
