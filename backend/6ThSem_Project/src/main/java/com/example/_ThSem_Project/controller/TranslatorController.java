package com.example._ThSem_Project.controller;

import com.example._ThSem_Project.dto.translatorDto.TranslatorResponse;
import com.example._ThSem_Project.services.TranslatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/translate")
public class TranslatorController {

    private  final TranslatorService translatorService;

    @PostMapping("/response")
    public ResponseEntity<?> translate(@RequestBody TranslatorResponse translatorResponse){
        if(translatorResponse.text() == null || translatorResponse.target_lang() == null){
            return ResponseEntity.badRequest().body("Text or Target_language cannot be empty");
        }
        String result = translatorService.translator(translatorResponse.text() , translatorResponse.target_lang());

        return ResponseEntity.ok(Map.of(
                "status" , "success",
                "translate", result

        ));
    }

}
