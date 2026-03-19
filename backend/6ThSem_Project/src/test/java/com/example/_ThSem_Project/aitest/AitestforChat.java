package com.example._ThSem_Project.aitest;

import com.example._ThSem_Project.services.AiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AiServiceIntegrationTest {

    @Autowired
    private AiService aiService;

    @Test
    void testChatAsTutorIntegration() {
        String reply = aiService.chatAsTutor("Explain Newton's first law");
        System.out.println("Tutor reply: " + reply);

        assertNotNull(reply);
        assertFalse(reply.isBlank());
    }
}
