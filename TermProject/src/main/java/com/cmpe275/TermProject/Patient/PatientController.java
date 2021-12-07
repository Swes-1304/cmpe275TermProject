package com.cmpe275.TermProject.Patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@Transactional
@RestController
public class PatientController {



    @RequestMapping(value = "/signup" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addPatient(){
        System.out.println("HELLLLO");
        return new ResponseEntity<>("Hello", HttpStatus.OK);
    }
}
