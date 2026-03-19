package com.example._ThSem_Project.services.impl;

import com.example._ThSem_Project.services.TtsService;
import com.google.cloud.texttospeech.v1.*;
import org.springframework.stereotype.Service;

@Service
public class TtsServiceImpl implements TtsService {
    @Override
    public byte[] synthesize(String aiResponse) throws Exception {
       try(TextToSpeechClient toSpeechClient = TextToSpeechClient.create())
       {
           SynthesisInput input = SynthesisInput.newBuilder().setText(aiResponse).build();
           VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                   .setLanguageCode("en-US")
                   .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                   .build();
           AudioConfig audioConfig = AudioConfig.newBuilder()
                   .setAudioEncoding(AudioEncoding.MP3)
                   .build();
           SynthesizeSpeechResponse response = toSpeechClient.synthesizeSpeech(input , voice , audioConfig);
           return response.getAudioContent().toByteArray();
       }

    }
}
