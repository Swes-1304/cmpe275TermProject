package com.cmpe275.TermProject.Services;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AppointmentService {
    public ResponseEntity<?> bookAppointment(Map<String, Object> reqBody);

	public ResponseEntity<?> changeAppointment(Map<String, Object> reqBody);
	
	public ResponseEntity<?> cancelAppointment(Map<String, Object> reqBody);
	
	public ResponseEntity<?> getAppointments(Map<String, Object> reqBody);
	
	public ResponseEntity<?> onlineCheckIn(Map<String, Object> reqBody);
}
