package com.cmpe275.TermProject.Services;

import com.cmpe275.TermProject.Models.Appointment;
import com.cmpe275.TermProject.Models.Clinic;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Models.Vaccine;
import com.cmpe275.TermProject.Repository.AppointmentRepository;
import com.cmpe275.TermProject.Repository.ClinicRepository;
import com.cmpe275.TermProject.Repository.VaccinationRepository;
import com.cmpe275.TermProject.Repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional(rollbackFor= SQLException.class, propagation = Propagation.REQUIRED )
@Service
public class AppointmentServiceImpl implements AppointmentService{

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    ClinicRepository clinicRepository;
    @Autowired
    VaccinationRepository vaccinationRepository;
    @Autowired
    PatientRepository patientRepository;

    @Override
    public ResponseEntity<?> bookAppointment(Map<String, Object> reqBody) {
        System.out.println("Inside bookAppointment service:"+reqBody);
        
        //List<Long> lstVaccineId = (List<Long>)reqBody.get("vaccinationId");
        List<Integer> lstVaccineId = (List<Integer>)reqBody.get("vaccinationId");
        String appointmentDate = (String)reqBody.get("appointmentDate");
        String appointmentTime = (String)reqBody.get("appointmentTime");
        Long clinicId = new Long((Integer)reqBody.get("clinicId"));
        int status = (Integer)reqBody.get("status");
        long mrn = new Long((int)reqBody.get("mrn"));        
        List<Vaccine> lstVaccine = new ArrayList<>();
        
        for(Integer vaccineId : lstVaccineId) {
        	lstVaccine.add(vaccinationRepository.getById(new Long(vaccineId)));
        	System.out.print("Vaccine ID : " + lstVaccine.get(0).getVaccineId());
        }
        
        Clinic clinic = clinicRepository.getById(clinicId);
        //check if doctors are available
        //store in Patient_Vaccination        
        //YYYY-MM-DD , HH:MM:SS
        
        Appointment appointment = new Appointment();
        appointment.setClinic(clinic);
        //appointment.setVaccines(lstVaccine);       
        appointment.setAppointmentDate(null);
        appointment.setStatus(status);
        appointment.setAppointmentTime(null);
        appointment.setPatient(patientRepository.findByMRN(mrn));        
        
        try{
        	appointmentRepository.save(appointment);
        	return new ResponseEntity<>("Appointment Booked successfully",HttpStatus.CREATED);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error Booking Appointment",HttpStatus.BAD_REQUEST);
        }            
    }
    
    public ResponseEntity<?> changeAppointment(Map<String, Object> reqBody) {    	
    	System.out.println("Inside changeAppointment service:"+reqBody);
    	
    	long appointmentId = (Long)reqBody.get("appointmentId");
        List<Long> lstVaccineId = (List<Long>)reqBody.get("vaccinationId");
        String appointmentDate = (String)reqBody.get("appointmentDate");
        String appointmentTime = (String)reqBody.get("appointmentTime");        
        int status = (Integer)reqBody.get("status");        
        List<Vaccine> lstVaccine = new ArrayList<>();
        
        for(Long vaccineId : lstVaccineId) {        	
        	lstVaccine.add(vaccinationRepository.getById(vaccineId));
        	
        }
        
        Optional<Appointment> appointmentPresent = appointmentRepository.findById(appointmentId);
    	
        if(appointmentPresent.isPresent()) {
        	Appointment appointment = appointmentPresent.get();
        	appointment.setAppointmentDate(null);
        	appointment.setAppointmentTime(null);
        	appointment.setStatus(status);
        	appointment.setVaccines(lstVaccine);
        	
        	 try{
             	appointmentRepository.save(appointment);
             	return new ResponseEntity<>("Appointment Updated successfully",HttpStatus.CREATED);
             }catch(Exception e){
                 e.printStackTrace();
                 return new ResponseEntity<>("Error in Change Appointment",HttpStatus.BAD_REQUEST);
             }   
        }
        
        return new ResponseEntity<>("Appointment Not Present",HttpStatus.BAD_REQUEST);
    }
    
    public ResponseEntity<?> cancelAppointment(Map<String, Object> reqBody) {
    	System.out.println("Inside cancelAppointment service:"+reqBody);
    	long appointmentId = (Long)reqBody.get("appointmentId");
    	
    	try {
    		appointmentRepository.deleteById(appointmentId);
    		return new ResponseEntity<>("Appointment Cancelled successfully",HttpStatus.CREATED);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in Cancel Appointment",HttpStatus.BAD_REQUEST);
		}
    }
    
    public ResponseEntity<?> getAppointments(Map<String, Object> reqBody) {
    	System.out.println("Inside getAppointments service:"+reqBody);
    	String date = (String)reqBody.get("date");
    	int patientId = (Integer)reqBody.get("patientId");
    	
    	try {
    		List<Appointment> lstAllAppointments = appointmentRepository.findAll();
    		List<Appointment> lstAppointment = new ArrayList<>();
    		
    		for(Appointment appointment : lstAllAppointments) {
    			if(appointment.getPatient() != null && appointment.getPatient().getMrn() == patientId) {
    				//check date condition
    				
    				lstAppointment.add(appointment);
    			}
    		}
    		
    		//Patient patient = patientRepository.getById(patientId + "");
    		//List<Appointment> lstAppointment = appointmentRepository.findByPatientId(patient);
    		return new ResponseEntity<>(lstAppointment,HttpStatus.OK);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in fetching appointments", HttpStatus.BAD_REQUEST);	
		}    	
    }
    
    public ResponseEntity<?> onlineCheckIn(Map<String, Object> reqBody) {
    	System.out.println("Inside onlineCheckIn service:"+reqBody);
    	long appointmentId = (Long)reqBody.get("appointmentId");
    	
    	try {
    		Appointment appointment = appointmentRepository.getById(appointmentId);
    		appointment.setStatus(1);
    		appointmentRepository.save(appointment);
    		return new ResponseEntity<>("Online Checkin successful",HttpStatus.CREATED);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in Online Checkin",HttpStatus.BAD_REQUEST);
		}
    }
}
