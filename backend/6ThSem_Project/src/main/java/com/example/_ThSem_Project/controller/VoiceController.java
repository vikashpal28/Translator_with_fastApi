package com.example._ThSem_Project.controller;

import com.example._ThSem_Project.services.AiService;
import com.example._ThSem_Project.services.SpeechService;
import com.example._ThSem_Project.services.TtsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.core.ObjectReadContext;

import java.util.Base64;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class VoiceController {

    private final AiService aiService;
    private final SpeechService speechService;
    private final TtsService ttsService;

    @PostMapping("/voice")
    public ResponseEntity<Map<String , Object>> handleVoice(@RequestParam("file")MultipartFile file) throws Exception{
        //speech to text
        String textUser = speechService.transcribe(file.getBytes());

        String aiResponse = aiService.chatAsTutor(textUser);

        //text to speech

        byte[] audioBytes = ttsService.synthesize(aiResponse);

        return ResponseEntity.ok(Map.of(
                "transcribe" , textUser,
                "responseText",aiResponse,
                "responseAudio" , Base64.getEncoder().encodeToString(audioBytes)
        ));


    }
}
