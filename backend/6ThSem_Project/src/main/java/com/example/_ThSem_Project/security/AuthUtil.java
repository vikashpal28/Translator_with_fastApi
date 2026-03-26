package com.example._ThSem_Project.security;


import com.example._ThSem_Project.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthUtil {

    @Value("${jwt.secret-key}")
    private String jwtSecretKey;

    private SecretKey getSecretKey() {
        // Ensure your secret key is at least 32 characters long for HS256
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject(user.getUsername()) // Changed to email for clarity
                .claim("userId", user.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 60 ))
                .signWith(getSecretKey()) // Automatically chooses HS algorithm based on key
                .compact();
    }

    public JwtUserPrincipal verifyAccessToken(String token) {
        try {
            log.info("token {} " , token);
            Claims claims = Jwts.parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            Long userId = Long.parseLong(claims.get("userId", String.class));
            String username = claims.getSubject();

            return new JwtUserPrincipal(userId, username);
        } catch (Exception e) {
            // Log the specific reason (Expired, Malformed, etc.)
            log.error("JWT Verification Failed: {}", e.getMessage());
            return null;
        }
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof JwtUserPrincipal principal)) {
            log.warn("Attempted to access userId without valid authentication context");
            return null; // Return null instead of throwing an exception to avoid loops
        }

        return principal.userId(); // Assuming JwtUserPrincipal is a record
    }
}