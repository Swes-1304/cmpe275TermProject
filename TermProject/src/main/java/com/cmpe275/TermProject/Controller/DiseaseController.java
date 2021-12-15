package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Map;

@Transactional
@RestController
@CrossOrigin
public class DiseaseController {

    @Autowired
    DiseaseService diseaseService;

    @RequestMapping(value = "/addDisease" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> addDisease(@RequestBody Map<String, Object> inputJson){

        return new ResponseEntity<>(diseaseService.addDisease(inputJson), HttpStatus.OK);
    }

    @RequestMapping(value = "/getDiseases" , method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getDiseases(){

        return new ResponseEntity<>(diseaseService.getDiseases(), HttpStatus.OK);
    }
}
