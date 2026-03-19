package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.dto.AuthResponse;
import com.example._ThSem_Project.dto.LoginRequest;
import com.example._ThSem_Project.dto.SignUpRequest;
import com.example._ThSem_Project.entity.User;
import com.example._ThSem_Project.mapper.UserMapper;
import com.example._ThSem_Project.repository.UserRepository;
import com.example._ThSem_Project.security.AuthUtil;
import com.example._ThSem_Project.services.AuthServices;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
public class AuthServiceImpl implements AuthServices {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    AuthUtil authUtil;
    AuthenticationManager authenticationManager;
    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username() , request.password())
        );

        User user = (User)authentication.getPrincipal();
        String accessToken = authUtil.generateAccessToken(user);

        return new AuthResponse(accessToken , userMapper.toUserProfileResponse(user));
    }

    @Override
    public AuthResponse signup(SignUpRequest request) {
        userRepository.findByUsername(request.username()).ifPresent(
                user -> {
                    try {
                        throw new BadRequestException("user already exists " + request.username());
                    } catch (BadRequestException e) {
                        throw new RuntimeException(e);
                    }
                }
        );

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        user = userRepository.save(user);

        String accessToken = authUtil.generateAccessToken(user);

        return new AuthResponse(accessToken , userMapper.toUserProfileResponse(user));
    }
}
