package com.cmpe275.TermProject.Services;


import com.cmpe275.TermProject.Models.Address;
import com.cmpe275.TermProject.Services.AppointmentServiceImpl;
import com.cmpe275.TermProject.Models.Clinic;
import com.cmpe275.TermProject.Repository.ClinicRepository;
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

@Transactional(rollbackFor= SQLException.class, propagation = Propagation.REQUIRED )
@Service
public class ClinicServiceImpl implements ClinicService{

    @Autowired
    ClinicRepository clinicRepository;
    @Autowired
    AppointmentServiceImpl appointmentService;

    @Override
    public ResponseEntity<?> addClinic(Map<String, Object> reqBody) {
        System.out.println("inside addClinic service:"+reqBody);

        List<Clinic> clinicList = clinicRepository.findAll();

        for(Clinic clinic : clinicList){
            if(clinic.getClinicName().equals((String)reqBody.get("clinicName"))){
                System.out.println("Clinic name has to be unique");
                return new ResponseEntity<>("Clinic name already exist!", HttpStatus.BAD_REQUEST);
            }
        }

        Clinic newClinic = new Clinic();
        newClinic.setClinicName((String) reqBody.get("clinicName"));
        newClinic.setNumberOfPhysicians((Integer) reqBody.get("noOfPhysicians"));
        newClinic.setBusinessHoursStart(LocalTime.parse((String)reqBody.get("startTime")));
        newClinic.setBusinessHoursEnd(LocalTime.parse((String) reqBody.get("endTime")));


        Address newAddress = new Address();
            newAddress.setStreet((String) reqBody.get("street"));
        newAddress.setCity((String) reqBody.get("city"));
        newAddress.setState((String) reqBody.get("state"));
        newAddress.setZipCode((String) reqBody.get("zipCode"));

        String num= "";
        if ((String) reqBody.get("number") == null || (String) reqBody.get("number") == ""){
            num="";
        }else{
            newAddress.setNumber((String) reqBody.get("number"));
        }

        newClinic.setAddress(newAddress);

        try{
            Clinic saveClinic = clinicRepository.save(newClinic);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error creating Clinic",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Clinic Added successfully",HttpStatus.CREATED);
    }
    
    public ResponseEntity<?> getClinics(LocalDate localDate, LocalTime localTime){
    	try {
    	List<Clinic> lstClinic = clinicRepository.findAll();
    	List<Clinic> lstClinicRes = new ArrayList<Clinic>();
    	System.out.println(localDate + " " + localTime);
    	
    	for(Clinic clinic : lstClinic) {
    		  if(appointmentService.getApppointmentsHelper(clinic.getClinicId(), localDate, localTime, clinic.getNumberOfPhysicians())) {       	
    	         	 lstClinicRes.add(clinic);
    	      }
    	}
    	
    	return new ResponseEntity<>(lstClinicRes,HttpStatus.CREATED);
    	}
    	catch (Exception e) {
		  return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
		}
    	
    	
    }
}
