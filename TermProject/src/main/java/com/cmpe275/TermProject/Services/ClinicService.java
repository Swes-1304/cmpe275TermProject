package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ClinicService {
    public ResponseEntity<?> addClinic(Map<String, Object> reqBody);
}
