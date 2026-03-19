package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.services.SpeechService;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

@Service
public class SpeechServiceImpl implements SpeechService {
    @Override
    public String transcribe(byte[] bytes) throws Exception {
        //try with resource : it automatically close the SpeechClient
        try(SpeechClient speechClient = SpeechClient.create())
        {
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)  // it set to 16 bit pcm
                    .setLanguageCode("en-US") // set language to american english
                    .build();
            //audio should be processed
            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(ByteString.copyFrom(bytes))
                    .build();
            // send data to google servers
            RecognizeResponse response = speechClient.recognize(config , audio);
            return response.getResultsList().stream()
                    .map(r -> r.getAlternatives(0).getTranscript())
                    .findFirst()
                    .orElse("");
        }
    }
}
