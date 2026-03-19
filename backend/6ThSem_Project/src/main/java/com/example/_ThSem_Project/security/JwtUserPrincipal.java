package com.example._ThSem_Project.security;

public record JwtUserPrincipal(
        Long userId ,
        String username
) {
    public Long getUserId(){
        return userId;
    }
}
