package com.example._ThSem_Project.services;

public interface SpeechService {
    String transcribe(byte[] bytes) throws Exception;
}
