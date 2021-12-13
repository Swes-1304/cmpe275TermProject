package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

public interface AppointmentService {
    public ResponseEntity<?> bookAppointment(Map<String, Object> reqBody);

	public ResponseEntity<?> changeAppointment(Map<String, Object> reqBody);
	
	public ResponseEntity<?> cancelAppointment(Map<String, Object> reqBody);
	
	public ResponseEntity<?> getFutureAppointments(int patientId, LocalDate date, LocalTime time);
	
	public ResponseEntity<?> getPastAppointments(int patientId, LocalDate date, LocalTime time);
	
	public ResponseEntity<?> onlineCheckIn(Map<String, Object> reqBody);
}
