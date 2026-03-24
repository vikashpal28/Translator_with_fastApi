package com.example._ThSem_Project.controller;

import com.example._ThSem_Project.security.JwtUserPrincipal;
import com.example._ThSem_Project.services.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/feedback")
    public ResponseEntity<String> giveFeedback(@AuthenticationPrincipal JwtUserPrincipal userPrincipal , @RequestBody String message){
        return ResponseEntity.ok(feedbackService.giveFeedback(userPrincipal , message));
    }

}
