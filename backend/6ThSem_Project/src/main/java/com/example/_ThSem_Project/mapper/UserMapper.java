package com.example._ThSem_Project.mapper;

import com.example._ThSem_Project.dto.SignUpRequest;
import com.example._ThSem_Project.dto.UserProfileResponse;
import com.example._ThSem_Project.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "name", target = "name")
    UserProfileResponse toUserProfileResponse(User user);

    User toUser(SignUpRequest signUpRequest);
}
