package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.dto.translatorDto.TranslatorResponse;
import com.example._ThSem_Project.services.TranslatorService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;


@Service
public class TranslatorServiceImpl implements TranslatorService {

    private final String FASTAPI_URL = "http://localhost:8001/translate";
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String translator(String text, String target_lang) {
        TranslatorResponse request = new TranslatorResponse(text , target_lang);

        try{
      // sending the post request
            Map<String , Object> response = restTemplate.postForObject(FASTAPI_URL , request , Map.class);
            return (String) response.get("translated_text");
        }
        catch (RuntimeException e){
         return "error" + e.getMessage();
        }
    }
}
