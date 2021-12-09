package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Transactional
@RestController
@CrossOrigin
public class VaccineController {

    @Autowired
    VaccineService vaccineService;

    @RequestMapping(value = "/addVaccine" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addVaccine(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(vaccineService.addVaccine(inputJson), HttpStatus.OK);
    }
}
