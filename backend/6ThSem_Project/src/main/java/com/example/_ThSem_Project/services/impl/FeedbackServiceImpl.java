package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.entity.UserFeedBack;
import com.example._ThSem_Project.error.ResourceNotFoundException;
import com.example._ThSem_Project.repository.UserFeedBackRepository;
import com.example._ThSem_Project.repository.UserRepository;
import com.example._ThSem_Project.security.JwtUserPrincipal;
import com.example._ThSem_Project.services.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final UserRepository userRepository;
    private final UserFeedBackRepository userFeedBackRepository;

    @Override
    public String giveFeedback(JwtUserPrincipal userPrincipal, String message) {
      var user = userRepository.findById(userPrincipal.userId()).orElseThrow(
              () -> new ResourceNotFoundException("user not found", userPrincipal.userId().toString())
      );

      UserFeedBack userFeedBack = new UserFeedBack();
      userFeedBack.setFeedBack(message);
      userFeedBack.setUser(user);
      userFeedBackRepository.save(userFeedBack);
      return "Feedback Successfully submitted";
    }
}
