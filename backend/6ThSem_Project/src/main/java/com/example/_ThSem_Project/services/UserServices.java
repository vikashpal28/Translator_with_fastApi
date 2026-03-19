package com.example._ThSem_Project.services;


import com.example._ThSem_Project.dto.UserProfileResponse;

public interface UserServices {

    UserProfileResponse getProfile(Long userId);
}
