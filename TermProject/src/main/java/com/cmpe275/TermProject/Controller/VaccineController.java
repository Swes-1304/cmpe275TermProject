package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
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

    @RequestMapping(value = "/getvaccine", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> getVaccine(){
        return vaccineService.getVaccine();
    }

    @RequestMapping(value = "/getVaccineDue", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getVaccineDue(@RequestParam (value = "patientId", required = true) int patientId,
                                           @RequestParam (value = "date", required= true) String date,
                                           @RequestParam ( value = "time", required= true) String time){
        return vaccineService.getVaccineDue(patientId, LocalDate.parse(date), LocalTime.parse(time));
    }

    @RequestMapping(value = "/getVaccineHistory", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getVaccineHistory(@RequestParam (value = "patientId", required = true) int patientId,
                                           @RequestParam (value = "date", required= true) String date,
                                           @RequestParam ( value = "time", required= true) String time){
        return vaccineService.getVaccineHistory(patientId, LocalDate.parse(date), LocalTime.parse(time));
    }


}
