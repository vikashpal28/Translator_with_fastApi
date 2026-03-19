package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.dto.UserProfileResponse;
import com.example._ThSem_Project.error.ResourceNotFoundException;
import com.example._ThSem_Project.repository.UserRepository;
import com.example._ThSem_Project.services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserServices  , UserDetailsService {
  private  final UserRepository userRepository;
    @Override
    public UserProfileResponse getProfile(Long userId) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("no user find by this" , username));
    }
}
