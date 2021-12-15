package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;
import java.util.Map;

@Transactional
@RestController
@CrossOrigin
public class PatientController{


    @Autowired
    PatientService patientService;

    @RequestMapping(value = "/signup" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addPatient(@RequestBody Map<String, Object> inputJson){

        return patientService.signUpUser(inputJson);
    }

    @RequestMapping(value="/login", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> inputJson){

        return patientService.loginUser(inputJson);
    }

    @RequestMapping(value="/googlesignon", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> googleSignon(@RequestBody Map<String, Object> inputJson){

        return patientService.googleSignon(inputJson);
    }

    @RequestMapping(value="/googlesignup", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> googleSignup(@RequestBody Map<String, Object> inputJson){

        return patientService.googleSignon(inputJson);
    }

    @RequestMapping(value="/testemail", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> testEmail(){

        return patientService.testEmail();
    }
}
