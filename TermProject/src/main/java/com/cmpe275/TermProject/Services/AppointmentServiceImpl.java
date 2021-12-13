package com.cmpe275.TermProject.Services;

import com.cmpe275.TermProject.Models.Appointment;
import com.cmpe275.TermProject.Models.Clinic;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Models.Vaccine;
import com.cmpe275.TermProject.Models.Patient_Vaccination;
import com.cmpe275.TermProject.Repository.AppointmentRepository;
import com.cmpe275.TermProject.Repository.ClinicRepository;
import com.cmpe275.TermProject.Repository.VaccinationRepository;
import com.cmpe275.TermProject.Repository.PatientRepository;
import com.cmpe275.TermProject.Repository.PatientVaccinationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.temporal.ChronoUnit;

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
    @Autowired
    PatientVaccinationRepository patientVaccinationRepository;

    @Override
    public ResponseEntity<?> bookAppointment(Map<String, Object> reqBody) {
        System.out.println("Inside bookAppointment service:"+reqBody);
        
        //List<Long> lstVaccineId = (List<Long>)reqBody.get("vaccinationId");
        List<Integer> lstVaccineId = (List<Integer>)reqBody.get("vaccinationIds");
        System.out.println("Line 47 : " + lstVaccineId);
        LocalDate appointmentDate = (LocalDate.parse((String)reqBody.get("appointmentDate")));
        LocalTime appointmentTime = (LocalTime.parse((String)reqBody.get("appointmentTime")));
        //LocalTime appointmentTime = (LocalTime)reqBody.get("appointmentTime");
        Long clinicId = new Long((Integer)reqBody.get("clinicId"));
        int status = 2;//(Integer)reqBody.get("status");
        long mrn = new Long((int)reqBody.get("mrn"));  
        List<Integer> lstShotNumber =  (List<Integer>)reqBody.get("shotNumber");
        List<Vaccine> lstVaccine = new ArrayList<>();
        Patient patient = patientRepository.findByMRN(mrn);
        
        if(patient == null) {
        	return new ResponseEntity<>("Patient doesn't exist",HttpStatus.BAD_REQUEST);
        }
        
        for(Integer vaccineId : lstVaccineId) {
        	lstVaccine.add(vaccinationRepository.getById(new Long(vaccineId)));
        	System.out.print("Vaccine ID : " + vaccinationRepository.getById(new Long(vaccineId)).getVaccineId());
        }
        
        System.out.println(lstVaccineId);
        
        Clinic clinic = clinicRepository.getById(clinicId);
        
        //check if doctors are available
        if(!getApppointmentsHelper(clinicId, appointmentDate, appointmentTime, clinic.getNumberOfPhysicians())) {       	
        	 return new ResponseEntity<>("All physicians are busy at this selected time",HttpStatus.BAD_REQUEST);
        }
        
        //check if the patient has other appointments at the same time
        List<Appointment> lstPatientAppointment = appointmentRepository.findByPatientMRN(mrn);        
        System.out.println(lstPatientAppointment);
        
        for(Appointment appointment : lstPatientAppointment) {
        	System.out.println("Line 77 : " + appointment.getAppointmentDate() + " " + appointment.getAppointmentTime());
        	System.out.println("Line 78 : " + appointmentDate + " " + appointmentTime);
        	System.out.println(appointmentDate.equals(appointment.getAppointmentDate()));
        	System.out.println(appointmentTime.equals((appointment.getAppointmentTime())));
        	if(appointment.getAppointmentDate().equals(appointmentDate) && appointment.getAppointmentTime().equals(appointmentTime)) {
        		System.out.println("Line 79 Inside if : " + appointment.getAppointmentDate() + " " + appointment.getAppointmentTime());
        		return new ResponseEntity<>("Patient already has another appointment at the same selected date and time",HttpStatus.BAD_REQUEST);
        	}
        }
        
      //store in Patient_Vaccination   
        int index = 0;
        for(int vaccineId : lstVaccineId) {        	
        	Patient_Vaccination patientvaccination = new Patient_Vaccination();
        	patientvaccination.setPatient(patient);        	
        	patientvaccination.setShotNumber(lstShotNumber.get(index++));
        	patientvaccination.setVaccinationTime(appointmentTime);
        	patientvaccination.setVaccinationDate(appointmentDate);
        	patientvaccination.setVaccine(vaccinationRepository.getById(new Long(vaccineId)));
        	//List<Clinic> lstClinic = new ArrayList<Clinic>();
        	//lstClinic.add(clinic);    
        	
        	patientvaccination.setClinic(clinic);
        	patientVaccinationRepository.save(patientvaccination);
        }            
        
        
        Appointment appointment = new Appointment();
        appointment.setClinic(clinic);
        System.out.println(" before setvaccices");
        appointment.setVaccines(lstVaccine);   
        
        System.out.println(" after setvaccices");
        appointment.setAppointmentDate(appointmentDate);
        appointment.setStatus(status);
        appointment.setMimicStatus(status);
        appointment.setAppointmentTime(appointmentTime);
        appointment.setPatient(patient);        
        
        try{
        	appointmentRepository.save(appointment);
        	return new ResponseEntity<>("Appointment Booked successfully",HttpStatus.CREATED);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error Booking Appointment",HttpStatus.BAD_REQUEST);
        }            
    }
    
    public boolean getApppointmentsHelper(long clinicId, LocalDate date, LocalTime time, int noOfPhysicians) {
    	List<Appointment> lstAppointment = appointmentRepository.findAll();
    	int count = 0;
    	
    	for(Appointment appointment : lstAppointment) {
    		if(appointment.getClinic().getClinicId() == clinicId && appointment.getAppointmentDate().equals(date) && appointment.getAppointmentTime().equals(time)) {
    			count++;
    		}
    	}
    	
    	if(count >= noOfPhysicians) {
    		return false;
    	}
    	
    	return true;
    }
    
    public ResponseEntity<?> changeAppointment(Map<String, Object> reqBody) {    	
    	System.out.println("Inside changeAppointment service:"+reqBody);
    	
    	int appointmentId = (Integer)reqBody.get("appointmentId");
        //List<Integer> lstVaccineId = (List<Integer>)reqBody.get("vaccinationId");
        LocalDate appointmentDate = (LocalDate.parse((String)reqBody.get("appointmentDate")));
        LocalTime appointmentTime = (LocalTime.parse((String)reqBody.get("appointmentTime"))); 
        Long clinicId = new Long((Integer)reqBody.get("clinicId"));
        //int status = (Integer)reqBody.get("status");        
        //List<Vaccine> lstVaccine = new ArrayList<>();      
        long mrn = new Long((int)reqBody.get("mrn"));  
        //List<Integer> lstShotNumber =  (List<Integer>)reqBody.get("shotNumber");
        Clinic clinic = clinicRepository.getById(clinicId);        
       
        //check if doctors are available
        if(!getApppointmentsHelper(clinicId, appointmentDate, appointmentTime, clinic.getNumberOfPhysicians())) {       	
        	 return new ResponseEntity<>("All physicians are busy at this selected time",HttpStatus.BAD_REQUEST);
        }        
        
        
//        for(int vaccineId : lstVaccineId) {        	
//        	lstVaccine.add(vaccinationRepository.getById(new Long(vaccineId)));       	
//        	
//        }
        
        Optional<Appointment> appointmentPresent = appointmentRepository.findById(new Long(appointmentId));
    	
        if(appointmentPresent.isPresent()) {
        	Appointment appointment = appointmentPresent.get();       			  
        	List<Patient_Vaccination> lstPatientVaccination = patientVaccinationRepository.findByMrn(mrn, appointment.getAppointmentDate(), appointment.getAppointmentTime());
        	for(Patient_Vaccination p: lstPatientVaccination) {
        		//long vaccineId = p.getVaccine().getVaccineId();
        		//boolean isPresent = false;
        		
//        		for(int vaccineIdNew : lstVaccineId) {
//        			if(new Long(vaccineIdNew) == vaccineId)
//        			{
//        				isPresent = true;
//        				break;
//        			}        				
//        		}
        		
//        		if(!isPresent) {
//        			//patientVaccinationRepository.deleteByMrn(mrn, appointment.)
//        		}
        		
        		p.setClinic(clinic);
        		p.setVaccinationDate(appointmentDate);
        		p.setVaccinationTime(appointmentTime);
        		patientVaccinationRepository.save(p);
        	}
        	
        	appointment.setAppointmentDate(appointmentDate);
        	appointment.setAppointmentTime(appointmentTime);
        	//appointment.setStatus(status);
        	//appointment.setVaccines(lstVaccine);
        	appointment.setClinic(clinic);
        	
        	 try{
             	appointmentRepository.save(appointment);
             	return new ResponseEntity<>("Appointment Updated successfully",HttpStatus.OK);
             }catch(Exception e){
                 e.printStackTrace();
                 return new ResponseEntity<>("Error in Change Appointment",HttpStatus.BAD_REQUEST);
             }   
        }
        
        return new ResponseEntity<>("Appointment Not Present",HttpStatus.BAD_REQUEST);
    }
    
    public ResponseEntity<?> cancelAppointment(Map<String, Object> reqBody) {
    	System.out.println("Inside cancelAppointment service:"+reqBody);
    	long appointmentId = new Long((Integer)reqBody.get("appointmentId"));
    
    	
    	try {    		
    		 
            Optional<Appointment> appointmentPresent = appointmentRepository.findById(new Long(appointmentId));
        	
            if(appointmentPresent.isPresent()) {
            	Appointment appointment = appointmentPresent.get();
            	List<Patient_Vaccination> lstPatientVaccination = patientVaccinationRepository.findByMrn(appointment.getPatient().getMrn(), appointment.getAppointmentDate(), appointment.getAppointmentTime());
    		
            	for(Patient_Vaccination p: lstPatientVaccination) {        		
            		patientVaccinationRepository.deleteById(p.getPatientVaccinationId());
            	}
            	
            	appointmentRepository.deleteById(appointmentId);
            	return new ResponseEntity<>("Appointment Cancelled successfully",HttpStatus.CREATED);
            }
            else {
            	return new ResponseEntity<>("Appointment Not Present",HttpStatus.BAD_REQUEST);
            }
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in Cancel Appointment",HttpStatus.BAD_REQUEST);
		}
    }
    
    public ResponseEntity<?> getFutureAppointments(int patientIdInt, LocalDate currentDate, LocalTime currentTime) {
    	System.out.println("Inside getFutureAppointments service:");
        //LocalDate currentDate = (LocalDate.parse((String)reqBody.get("date")));
        //LocalTime currentTime = (LocalTime.parse((String)reqBody.get("time")));    	
    	//int patientId = (Integer)reqBody.get("patientId");
    	long patientId = new Long(patientIdInt);
    	try {
    		List<Appointment> lstAllAppointments = appointmentRepository.findAll();
    		List<Appointment> lstAppointment = new ArrayList<>();
    		
    		for(Appointment appointment : lstAllAppointments) {
    			if(appointment.getPatient() != null && appointment.getPatient().getMrn() == patientId && appointment.getAppointmentDate().compareTo(currentDate) >= 0) {
    				//check date condition
    				
    				if(appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) < 0) {
    						continue;
    				}    			
    			
    				lstAppointment.add(appointment);
    			}
    		}    		
    		
    		return new ResponseEntity<>(lstAppointment,HttpStatus.OK);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in fetching appointments", HttpStatus.BAD_REQUEST);	
		}    	
    }
    
    public ResponseEntity<?> getPastAppointments(int patientIdInt, LocalDate currentDate, LocalTime currentTime) {
    	System.out.println("Inside getPastAppointments service:");
       // LocalDate currentDate = (LocalDate.parse((String)reqBody.get("date")));
        //LocalTime currentTime = (LocalTime.parse((String)reqBody.get("time")));    	
    	//int patientId = (Integer)reqBody.get("patientId");
    	long patientId = new Long(patientIdInt);
    	
    	try {
    		List<Appointment> lstAllAppointments = appointmentRepository.findAll();
    		List<Appointment> lstAppointment = new ArrayList<>();
    		
    		for(Appointment appointment : lstAllAppointments) {
    			if(appointment.getPatient() != null && appointment.getPatient().getMrn() == patientId && appointment.getAppointmentDate().compareTo(currentDate) <= 0) {
    				//check date condition
    				if(appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0) {
    						continue;
    				}    			
    			
    				lstAppointment.add(appointment);
    			}
    		}    		
    		
    		return new ResponseEntity<>(lstAppointment,HttpStatus.OK);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in fetching appointments", HttpStatus.BAD_REQUEST);	
		}    	  	
    }
    
    public ResponseEntity<?> onlineCheckIn(Map<String, Object> reqBody) {
    	System.out.println("Inside onlineCheckIn service:"+reqBody);
    	long appointmentId = new Long((Integer)reqBody.get("appointmentId"));
    	LocalDate curDate = (LocalDate.parse((String)reqBody.get("currentDate")));
    	LocalTime curTime = (LocalTime.parse((String)reqBody.get("currentTime")));
    	boolean isMimic = (Boolean)reqBody.get("mimic");
    	
    	try {
    		Appointment appointment = appointmentRepository.getById(appointmentId);
    		long daysBetween = ChronoUnit.DAYS.between(curDate, appointment.getAppointmentDate());
    		long timeBetween = ChronoUnit.MINUTES.between(appointment.getAppointmentTime() ,curTime);
    		System.out.println("DateDiff : " + daysBetween);
    		
    		if(Math.abs(daysBetween) > 1)
    		{
    			return new ResponseEntity<>("You can only checkin within 24hrs of the appointment date",HttpStatus.BAD_REQUEST);
    		}
    		else if(Math.abs(daysBetween) == 1) {
    			if(appointment.getAppointmentTime().compareTo(curTime) > 0) {
    				return new ResponseEntity<>("You can only checkin within 24hrs of the appointment date",HttpStatus.BAD_REQUEST);
    			}
    		}
    		
    		if(isMimic) {
    			appointment.setMimicAppointmentDate(curDate);
    			appointment.setMimicAppointmentTime(curTime); 
    			appointment.setMimicStatus(1);
    		}
    		else { appointment.setStatus(1);}
    		
    		appointmentRepository.save(appointment);
    		return new ResponseEntity<>("Online Checkin successful",HttpStatus.OK);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Error in Online Checkin",HttpStatus.BAD_REQUEST);
		}
    }
}
