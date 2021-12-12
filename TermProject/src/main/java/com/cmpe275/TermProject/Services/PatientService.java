package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface PatientService {

    public ResponseEntity<?> signUpUser(Map<String, Object> reqBody);

    public ResponseEntity<?> loginUser(Map<String, Object> reqBody);

    public ResponseEntity<?> googleSignon(Map<String, Object> reqBody);

    public ResponseEntity<?> googleSignup(Map<String, Object> reqBody);


}
