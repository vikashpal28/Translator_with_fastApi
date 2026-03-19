package com.example._ThSem_Project.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AuthUtil authUtil;
    private final HandlerExceptionResolver handlerExceptionResolver;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try{
        log.info("incoming request {}" , request.getRequestURI());
        final String requestHeaderToken = request.getHeader("Authorization");
        if(requestHeaderToken == null || !requestHeaderToken.startsWith("Bearer ")){
            filterChain.doFilter(request , response);
            return;
        }
        String jwtToken = requestHeaderToken.substring(7);
//        String jwtToken = requestHeaderToken.split("Bearer ")[1];
        log.info("jwtToken after Bearer {}" , jwtToken);
        JwtUserPrincipal user = authUtil.verifyAccessToken(jwtToken);

        if(user != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user , null , null);
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            log.info("successfully authenticated {} ", user.username());
        }

        filterChain.doFilter(request , response);

    } catch (Exception e) {
        handlerExceptionResolver.resolveException(request , response , null , e);
        log.error("Not Authenticate" , e.getMessage());
    }
    }


}
