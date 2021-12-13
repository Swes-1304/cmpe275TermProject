package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

public interface ClinicService {
    public ResponseEntity<?> addClinic(Map<String, Object> reqBody);

	public ResponseEntity<?> getClinics(LocalDate parse, LocalTime parse2);
}
