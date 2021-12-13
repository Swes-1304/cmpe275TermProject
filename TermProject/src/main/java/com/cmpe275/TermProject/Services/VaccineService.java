package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

public interface VaccineService {
    public ResponseEntity<?> addVaccine(Map<String, Object> reqBody);

    public ResponseEntity<?> getVaccine();

    ResponseEntity<?> getVaccineDue(int patientId, LocalDate date, LocalTime time);
    ResponseEntity<?> getVaccineHistory(int patientId, LocalDate date, LocalTime time);

}
