package com.cmpe275.TermProject.Patient;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Transactional
@RestController
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
}
