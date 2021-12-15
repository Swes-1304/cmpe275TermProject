package com.cmpe275.TermProject.Controller;

import com.cmpe275.TermProject.Services.AppointmentService;
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
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @RequestMapping(value = "/bookAppointment" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> inputJson){
    	System.out.println("Inside bookAppointment api of Appointment Controller");
        return appointmentService.bookAppointment(inputJson);
    }
    
    @RequestMapping(value = "/changeAppointment" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> changeAppointment(@RequestBody Map<String, Object> inputJson){

        return appointmentService.changeAppointment(inputJson);
    }

    @RequestMapping(value = "/cancelAppointment" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> cancelAppointment(@RequestBody Map<String, Object> inputJson){

        return appointmentService.cancelAppointment(inputJson);
    }   
    
    @RequestMapping(value = "/getFutureAppointments" , method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getFutureAppointments(@RequestParam (value = "patientId", required = true) int patientId,
    												@RequestParam (value = "date", required= true) String date,
    												@RequestParam ( value = "time", required= true) String time
    												){

    	System.out.println("appointmentcontroller47 : " + patientId + " " + date + " " + time);
        return appointmentService.getFutureAppointments(patientId, LocalDate.parse(date), LocalTime.parse(time));
    }
    
    @RequestMapping(value = "/getPastAppointments" , method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getPastAppointments(@RequestParam (value = "patientId", required = true) int patientId,
    												@RequestParam (value = "date", required= true) String date,
    												@RequestParam ( value = "time", required= true) String time
    												){

    	System.out.println("appointmentcontroller47 : " + patientId + " " + date + " " + time);
        return appointmentService.getPastAppointments(patientId, LocalDate.parse(date), LocalTime.parse(time));
    }
    
    @RequestMapping(value = "/onlineCheckIn" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> onlineCheckIn(@RequestBody Map<String, Object> inputJson){

        return appointmentService.onlineCheckIn(inputJson);
    }

    @RequestMapping(value = "/patientReport" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> patientReport(@RequestBody Map<String, Object> inputJson){
        System.out.println("HEY");

        return appointmentService.patientReport(inputJson);
    }

    @RequestMapping(value = "/systemReport" , method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> systemReport(@RequestBody Map<String, Object> inputJson){

        return appointmentService.systemReport(inputJson);
    }

    
}
