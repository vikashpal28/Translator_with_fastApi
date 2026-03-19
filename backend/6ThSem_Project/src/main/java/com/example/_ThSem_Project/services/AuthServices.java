package com.example._ThSem_Project.services;

import com.example._ThSem_Project.dto.AuthResponse;
import com.example._ThSem_Project.dto.LoginRequest;
import com.example._ThSem_Project.dto.SignUpRequest;


public interface AuthServices {

    public AuthResponse login(LoginRequest request);

    public AuthResponse signup(SignUpRequest request);
}
