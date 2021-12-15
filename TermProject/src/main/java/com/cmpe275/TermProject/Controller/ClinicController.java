package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.ClinicService;
import com.cmpe275.TermProject.Services.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

@Transactional
@RestController
@CrossOrigin
public class ClinicController {

    @Autowired
    ClinicService clinicService;

    @RequestMapping(value = "/addClinic" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addClinic(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(clinicService.addClinic(inputJson), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getClinics" , method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getClinics(@RequestParam (value = "date", required= true) String date,
    												@RequestParam ( value = "time", required= true) String time
    												){

    	//System.out.println("appointmentcontroller47 : " + patientId + " " + date + " " + time);
        return clinicService.getClinics(LocalDate.parse(date), LocalTime.parse(time));
    }


    @RequestMapping(value = "/getAllClinics" , method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getAllClinics(){
        return clinicService.getAllClinics();
    }
}
