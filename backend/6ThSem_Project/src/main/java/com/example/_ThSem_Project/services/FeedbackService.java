package com.example._ThSem_Project.services;

import com.example._ThSem_Project.security.JwtUserPrincipal;

public interface FeedbackService {
    String giveFeedback(JwtUserPrincipal userPrincipal, String message);
}
