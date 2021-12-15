package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface DiseaseService {
    public ResponseEntity<?> addDisease(Map<String, Object> reqBody);
    public ResponseEntity<?> getDiseases();
}
