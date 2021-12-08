//package com.cmpe275.TermProject.Services;
//
//import com.cmpe275.TermProject.Models.Disease;
//import com.cmpe275.TermProject.Repository.DiseaseRepository;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.List;
//import java.util.Optional;
//
//public class DiseaseServiceImpl implements DiseaseService{
//
//    public ResponseEntity<?> createDisease(String name, String description) {
//        System.out.println("createDisease");
//        if(name == null || name == ""|| name.length() == 0 ) {
//            return new ResponseEntity<>("Disease cannot be null or empty", HttpStatus.BAD_REQUEST);
//        }
//
//        if(description == null || description == ""|| description.length() == 0 ) {
//            description = " ";
//        }
//
////        check if the disease name exists
//        Disease diseaseExist = DiseaseRepository.findByName(name);
//
//
//
//        Optional<Passenger> opPassenger = passengerRepository.findById(passengerId);
//
//        return;
//    }
//}
