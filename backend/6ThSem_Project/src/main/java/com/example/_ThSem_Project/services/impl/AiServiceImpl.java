package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.services.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;


    @Override
    public String chatAsTutor(String textUser) {
        var response = chatClient.prompt()
                .system(s -> s.text("""
                        You are a friendly tutor who explains concepts clearly
                        and encourages the student and conversation with student.
                        """))
                .user(u -> u.text(textUser))
                .call()
                .chatClientResponse();

        return response.chatResponse().getResult().getOutput().getText();

    }
}
