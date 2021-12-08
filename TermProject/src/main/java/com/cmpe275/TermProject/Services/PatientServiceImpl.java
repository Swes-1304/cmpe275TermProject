package com.cmpe275.TermProject.Services;


import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Repository.PatientRepository;
import com.cmpe275.TermProject.Services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Transactional
@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    PatientRepository patientRepository;

    @Override
    public ResponseEntity<?> signUpUser(Map<String, Object> reqBody) {
        System.out.println("IN Patient Service Implementation:"+reqBody);

        // Email must be unique -
        List<Patient> patientList = patientRepository.findAll();

        for(Patient patient : patientList){
            if(patient.getEmail().equals((String)reqBody.get("email"))){
                System.out.println("Same Email");
                return new ResponseEntity<>("Email Id already exist!", HttpStatus.BAD_REQUEST);
            }
        }

        Patient newPatient = new Patient();
        newPatient.setEmail((String) reqBody.get("email"));
        newPatient.setPassword((String) reqBody.get("password"));
        newPatient.setFirstName((String) reqBody.get("firstName"));
        newPatient.setMiddleName((String) reqBody.get("middleName"));
        newPatient.setLastName((String) reqBody.get("lastName"));
        newPatient.setDOB((String) reqBody.get("dob"));

        // Address

        System.out.println(reqBody.get("address"));
        Map<String, String> addressMap =(Map<String, String>) reqBody.get("address");
        System.out.println(addressMap);
        StringBuilder address = new StringBuilder("");
        address.append(addressMap.get("street"));
        address.append(",");
        address.append(addressMap.get("apt"));
        address.append(",");
        address.append(addressMap.get("city"));
        address.append(",");
        address.append(addressMap.get("state"));
        address.append(",");
        address.append(String.valueOf(addressMap.get("zipcode")));
        newPatient.setAddress(address.toString());

        //

        newPatient.setGender((String) reqBody.get("gender"));

        // Checking if the patient can be admin or not
        String[] fullEmail = (String[]) ((String) reqBody.get("email")).split("@");
        String[] domain = fullEmail[1].split("\\."); // For splitting on . use \\.

        if(domain[0].equalsIgnoreCase("sjsu")){
            newPatient.setAdminBoolean(true);
        }else{
            newPatient.setAdminBoolean(false);
        }

        // MRN Logic

        newPatient.setMrn(2);

        //

        try{
            Patient returnedPatient = patientRepository.save(newPatient);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("error",HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Patient Created",HttpStatus.CREATED);

    }

    @Override
    public ResponseEntity<?> loginUser(Map<String, Object> reqBody) {

        System.out.println(reqBody);

        try{
            Patient patient = patientRepository.findByEmail((String) reqBody.get("email"));

            if(patient == null){
                return new ResponseEntity<>("Email does not exist",HttpStatus.CREATED);
            }

            if(patient.getPassword().equalsIgnoreCase((String) reqBody.get("password"))){
                return new ResponseEntity<>(patient, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Password does not Match",HttpStatus.BAD_REQUEST);
            }

        }catch(Exception error){
            error.printStackTrace();
            return new ResponseEntity<>("Error while querying",HttpStatus.BAD_REQUEST);
        }




    }
}
