package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Map;

@Transactional
@RestController
@CrossOrigin
public class PatientController{


    @Autowired
    PatientService patientService;

    @RequestMapping(value = "/signup" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addPatient(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(patientService.signUpUser(inputJson), HttpStatus.OK);
    }

    @RequestMapping(value="/login", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(patientService.loginUser(inputJson), HttpStatus.OK);
    }

    @RequestMapping(value="/googlesignon", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> googleSignon(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(patientService.googleSignon(inputJson), HttpStatus.OK);
    }
}
