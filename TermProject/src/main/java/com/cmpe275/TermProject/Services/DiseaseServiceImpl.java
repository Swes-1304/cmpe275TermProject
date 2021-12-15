package com.cmpe275.TermProject.Services;


import com.cmpe275.TermProject.Models.Disease;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Repository.DiseaseRepository;
import com.cmpe275.TermProject.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Transactional(rollbackFor= SQLException.class, propagation = Propagation.REQUIRED )
@Service
public class DiseaseServiceImpl implements DiseaseService{

    @Autowired
    DiseaseRepository diseaseRepository;


    public ResponseEntity<?> addDisease(Map<String, Object> reqBody) {
        System.out.println("inside adddisease service:"+reqBody);

        List<Disease> diseaseList = diseaseRepository.findAll();

        for(Disease disease : diseaseList){
            if(disease.getDiseaseName().equals((String)reqBody.get("diseaseName"))){
                System.out.println("Disease name has to be unique");
                return new ResponseEntity<>("Disease name already exist!", HttpStatus.BAD_REQUEST);
            }
        }
        String diseaseDescription= "";

        if ((String) reqBody.get("diseaseDescription") == null || (String) reqBody.get("diseaseDescription") == "" ){
             diseaseDescription = " ";
        }
        else{
            diseaseDescription = (String) reqBody.get("diseaseDescription");
        }

        Disease newDisease = new Disease();
        newDisease.setDiseaseName((String) reqBody.get("diseaseName"));
        newDisease.setDiseaseDescription(diseaseDescription);

        try{
            Disease saveDisease = diseaseRepository.save(newDisease);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error creating disease",HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Disease Added successfully",HttpStatus.CREATED);

    }

    public ResponseEntity<?> getDiseases() {

        System.out.println("inside getDiseases service:");

        List<Disease> diseaseList = diseaseRepository.findAll();
        return new ResponseEntity<>(diseaseList,HttpStatus.OK);
    }

}
