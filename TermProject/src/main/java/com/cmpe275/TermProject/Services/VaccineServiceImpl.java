package com.cmpe275.TermProject.Services;

import com.cmpe275.TermProject.Models.Clinic;
import com.cmpe275.TermProject.Models.Disease;
import com.cmpe275.TermProject.Models.Vaccine;
import com.cmpe275.TermProject.Repository.DiseaseRepository;
import com.cmpe275.TermProject.Repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Transactional(rollbackFor= SQLException.class, propagation = Propagation.REQUIRED )
@Service
public class VaccineServiceImpl implements VaccineService{

    @Autowired
    VaccinationRepository vaccinationRepository;

    @Autowired
    DiseaseRepository diseaseRepository;

    @Override
    public ResponseEntity<?> addVaccine(Map<String, Object> reqBody) {

        System.out.println("inside addVaccine service:" + reqBody);

        List<Vaccine> vaccineList = vaccinationRepository.findAll();
        for(Vaccine vaccine : vaccineList){
            if(vaccine.getVaccineName().equals((String)reqBody.get("vaccineName"))){
                System.out.println("Vaccine name has to be unique");
                return new ResponseEntity<>("Vaccine name already exist!", HttpStatus.BAD_REQUEST);
            }
        }

        Vaccine newVaccine = new Vaccine();
        newVaccine.setVaccineName((String) reqBody.get("vaccineName"));
        newVaccine.setManufacturer((String) reqBody.get("vaccineManufacturer"));
        newVaccine.setNumberOfShots((Integer) reqBody.get("noOfShots"));
        newVaccine.setDuration((Integer)reqBody.get("duration"));

        if (reqBody.get("shotInternalVal") == null){

        }else {
            newVaccine.setShotInternalVal((Integer) reqBody.get("shotInternalVal"));
        }

        if ( reqBody.get("diseases") == null ){
            System.out.println("Diseases cannot be null");
            return new ResponseEntity<>("Disease has to be mentioned!", HttpStatus.BAD_REQUEST);
        }

            ArrayList<Disease> diseasesTreated= new ArrayList<Disease>();

            ArrayList<String> diseasesList = (ArrayList) reqBody.get("diseases");
            if(diseasesList.size() != 0 ){

                for (int i = 0; i < diseasesList.size(); i++) {
                    System.out.println(diseasesList.get(i));
                    Disease diseaseName = diseaseRepository.findByName(diseasesList.get(i));
                    if(diseaseName != null ){
                        diseasesTreated.add(diseaseName);
                    }else{
                        System.out.println(diseasesList.get(i) + " Disease does not exist");
                        return new ResponseEntity<>(diseasesList.get(i) + " Disease does not exist!", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            else{
                System.out.println("Diseases value be zero");
                return new ResponseEntity<>("Disease cannot be null!", HttpStatus.BAD_REQUEST);
            }



        newVaccine.setDiseases(diseasesTreated);

        try{
            Vaccine saveVaccine = vaccinationRepository.save(newVaccine);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error creating vaccine",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Vaccine Added successfully",HttpStatus.CREATED);
    }

}
