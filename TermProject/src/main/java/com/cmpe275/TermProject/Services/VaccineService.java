package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface VaccineService {
    public ResponseEntity<?> addVaccine(Map<String, Object> reqBody);

    public ResponseEntity<?> getVaccine();
}
