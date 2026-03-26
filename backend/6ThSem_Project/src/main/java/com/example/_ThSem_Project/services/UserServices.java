package com.example._ThSem_Project.services;


import com.example._ThSem_Project.dto.LeaderboardResponse;
import com.example._ThSem_Project.dto.UserProfileResponse;

import java.util.List;

public interface UserServices {

    UserProfileResponse getProfile(Long userId);

    List<LeaderboardResponse> getLeaderboard();
}
