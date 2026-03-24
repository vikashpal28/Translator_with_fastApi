package com.example._ThSem_Project.controller;

import com.example._ThSem_Project.dto.AuthResponse;
import com.example._ThSem_Project.dto.LoginRequest;
import com.example._ThSem_Project.dto.SignUpRequest;
import com.example._ThSem_Project.dto.UserProfileResponse;
import com.example._ThSem_Project.security.JwtUserPrincipal;
import com.example._ThSem_Project.services.AuthServices;
import com.example._ThSem_Project.services.UserServices;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
   AuthServices authServices;
   UserServices userServices;

   @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request){
     return ResponseEntity.ok(authServices.login(request));
   }

   @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody @Valid SignUpRequest request){
       return ResponseEntity.ok(authServices.signup(request));
   }

   @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getProfile(@AuthenticationPrincipal JwtUserPrincipal user){
       Long userId = user.userId();
       return ResponseEntity.ok(userServices.getProfile(userId));
   }
}
