package com.cmpe275.TermProject.Services;

import com.cmpe275.TermProject.Models.*;
import com.cmpe275.TermProject.Repository.AppointmentRepository;
import com.cmpe275.TermProject.Repository.DiseaseRepository;
import com.cmpe275.TermProject.Repository.PatientVaccinationRepository;
import com.cmpe275.TermProject.Repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.lang.Integer.parseInt;

@Transactional(rollbackFor= SQLException.class, propagation = Propagation.REQUIRED )
@Service
public class VaccineServiceImpl implements VaccineService{

    @Autowired
    VaccinationRepository vaccinationRepository;

    @Autowired
    DiseaseRepository diseaseRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    PatientVaccinationRepository patientVaccinationRepository;

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

    @Override
    public ResponseEntity<?> getVaccine() {

        List<Vaccine> vaccineList =  vaccinationRepository.findAll();
        System.out.println(vaccineList);

        return new ResponseEntity<>(vaccineList, HttpStatus.OK);
    }

    public ResponseEntity<?> getVaccineDue(int patientIdInt, LocalDate currentDate, LocalTime currentTime){

        long patientId = new Long(patientIdInt);
        Set<Long> lstNotDueVaccine = new HashSet<>();
        HashMap<Long, Vaccine> VaccineMapSet = new HashMap<>();

        List<VaccinationDue> responseVaccinationDue = new ArrayList<>();

        List<Appointment> lstAppointments = appointmentRepository.findByPatientMRN(patientId);
        HashMap <Long, String> vacineNameMap = new HashMap<>();

        for ( Appointment appointment : lstAppointments){
            long daysBetween = ChronoUnit.DAYS.between(appointment.getAppointmentDate(),currentDate);
//                    long timeBetween = ChronoUnit.MINUTES.between(appointment.getAppointmentTime() ,currentTime);
            System.out.println("DateDiff : " + daysBetween);
            for ( Vaccine vaccine : appointment.getVaccines()){
                int shortNum = patientVaccinationRepository.findShots(patientId, appointment.getAppointmentDate(), appointment.getAppointmentTime(), vaccine.getVaccineId()).getShotNumber();

                if ((appointment.getAppointmentDate().compareTo(currentDate) <= 0 && (appointment.getStatus() == 1 || appointment.getMimicStatus() == 1))) {
                    if ((appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0)) {
                        continue;
                    }
                    if (shortNum < vaccine.getNumberOfShots() && vaccine.getShotInternalVal() < (daysBetween)){
//                    vaccine.setVaccineName(vaccine.getVaccineName()+":" + (shortNum+1));
                        VaccinationDue vaccineDue = new VaccinationDue();
                        vaccineDue.setVaccineID(vaccine.getVaccineId());
                        vaccineDue.setVaccineName(vaccine.getVaccineName()+"-" + (shortNum+1));
                        vaccineDue.setDiseases(vaccine.getDiseases());
                        vaccineDue.setManufacturer(vaccine.getManufacturer());
                        vaccineDue.setDuration(vaccine.getDuration());
                        vaccineDue.setNumberOfShots(vaccine.getNumberOfShots());
                        vaccineDue.setShotInternalVal(vaccine.getShotInternalVal());
                        vaccineDue.setShotNumber(shortNum+1);
                        vaccineDue.setDueDate(appointment.getAppointmentDate().plusDays(vaccine.getShotInternalVal()));
                        responseVaccinationDue.add(vaccineDue);
                        vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName()+"-" + (shortNum+1));
                        lstNotDueVaccine.add(vaccine.getVaccineId());
                        continue;
                    }
                    if ((appointment.getAppointmentDate().plusDays(vaccine.getDuration()).compareTo(currentDate.plusDays(new Long(365))) < 0 )){
                        VaccinationDue vaccineDue = new VaccinationDue();
                        vaccineDue.setVaccineID(vaccine.getVaccineId());
                        vaccineDue.setVaccineName(vaccine.getVaccineName());
                        vaccineDue.setDiseases(vaccine.getDiseases());
                        vaccineDue.setManufacturer(vaccine.getManufacturer());
                        vaccineDue.setDuration(vaccine.getDuration());
                        vaccineDue.setNumberOfShots(vaccine.getNumberOfShots());
                        vaccineDue.setShotInternalVal(vaccine.getShotInternalVal());
                        vaccineDue.setShotNumber(1);
                        vaccineDue.setDueDate(appointment.getAppointmentDate().plusDays(vaccine.getDuration()));
                        responseVaccinationDue.add(vaccineDue);
                        vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName());
                        lstNotDueVaccine.add(vaccine.getVaccineId());
                        continue;
                    }

                    if(vaccine.getDuration() < Math.abs(daysBetween) ){
                        continue;
                    }

                    lstNotDueVaccine.add(vaccine.getVaccineId());
//                    vacineNameMap.put(vaccine.getVaccineId(), vaccine);
//                    if (vaccine.getDuration() < 365) {
//                        if (shortNum < vaccine.getNumberOfShots()) {
//                            VaccinationDue vaccineDue = new VaccinationDue();
//                            vaccineDue.setVaccineID(vaccine.getVaccineId());
//                            vaccineDue.setVaccineName(vaccine.getVaccineName() + "-" + (shortNum + 1));
//                            vaccineDue.setDiseases(vaccine.getDiseases());
//                            vaccineDue.setManufacturer(vaccine.getManufacturer());
//                            vaccineDue.setDuration(vaccine.getDuration());
//                            vaccineDue.setNumberOfShots(vaccine.getNumberOfShots());
//                            vaccineDue.setShotInternalVal(vaccine.getShotInternalVal());
//                            vaccineDue.setShotNumber(shortNum + 1);
//                            vaccineDue.setDueDate(appointment.getAppointmentDate().plusDays(vaccine.getDuration()));
//                            responseVaccinationDue.add(vaccineDue);
//                        } else {
//                            VaccinationDue vaccineDue = new VaccinationDue();
//                            vaccineDue.setVaccineID(vaccine.getVaccineId());
//                            vaccineDue.setVaccineName(vaccine.getVaccineName());
//                            vaccineDue.setDiseases(vaccine.getDiseases());
//                            vaccineDue.setManufacturer(vaccine.getManufacturer());
//                            vaccineDue.setDuration(vaccine.getDuration());
//                            vaccineDue.setNumberOfShots(vaccine.getNumberOfShots());
//                            vaccineDue.setShotInternalVal(vaccine.getShotInternalVal());
//                            vaccineDue.setShotNumber(1);
//                            vaccineDue.setDueDate(appointment.getAppointmentDate().plusDays(vaccine.getDuration()));
//                            responseVaccinationDue.add(vaccineDue);
//                        }
//                    }

                }
//                vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName());
            }

//            if (appointment.getAppointmentDate().compareTo(currentDate) <= 0 && (appointment.getStatus() == 1 || appointment.getMimicStatus() == 1)){
//                if ( appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0 ) {
//                    continue;
//                }
//                        for ( Vaccine vaccine : appointment.getVaccines()){
//
//                            lstNotDueVaccine.add(vaccine.getVaccineId());
//                        }
//
//            }
        }


        List<Vaccine> lstAllVaccines = vaccinationRepository.findAll();
        List<Vaccine> lstVacineDue = new ArrayList<>();
        HashMap<HashMap<Long, String>,List<Vaccine>> res = new HashMap<>();

        for (Vaccine vaccine : lstAllVaccines){
            if(lstNotDueVaccine.contains(vaccine.getVaccineId())){
                    continue;
            }
            lstVacineDue.add(vaccine);
            VaccinationDue vaccineDue = new VaccinationDue();
            vaccineDue.setVaccineID(vaccine.getVaccineId());
            vaccineDue.setVaccineName(vaccine.getVaccineName());
            vaccineDue.setDiseases(vaccine.getDiseases());
            vaccineDue.setManufacturer(vaccine.getManufacturer());
            vaccineDue.setDuration(vaccine.getDuration());
            vaccineDue.setNumberOfShots(vaccine.getNumberOfShots());
            vaccineDue.setShotInternalVal(vaccine.getShotInternalVal());
            vaccineDue.setShotNumber(1);
            vaccineDue.setDueDate(LocalDate.now());
            responseVaccinationDue.add(vaccineDue);

        }
        res.put( vacineNameMap ,lstVacineDue);

        return new ResponseEntity<>(responseVaccinationDue, HttpStatus.OK);
    }

//    public ResponseEntity<?> getVaccineDue(int patientIdInt, LocalDate currentDate, LocalTime currentTime){
//
//        long patientId = new Long(patientIdInt);
//        Set<Long> lstNotDueVaccine = new HashSet<>();
//        List<VaccinationDue> responseVaccinationDue = new ArrayList<>();
//
//        List<Appointment> lstAppointments = appointmentRepository.findByPatientMRN(patientId);
//        HashMap <Long, String> vacineNameMap = new HashMap<>();
//
//        for ( Appointment appointment : lstAppointments){
//            long daysBetween = ChronoUnit.DAYS.between(appointment.getAppointmentDate(),currentDate);
////                    long timeBetween = ChronoUnit.MINUTES.between(appointment.getAppointmentTime() ,currentTime);
//            System.out.println("DateDiff : " + daysBetween);
//            for ( Vaccine vaccine : appointment.getVaccines()){
//                int shortNum = patientVaccinationRepository.findShots(patientId, appointment.getAppointmentDate(), appointment.getAppointmentTime(), vaccine.getVaccineId()).getShotNumber();
//                if (shortNum < vaccine.getNumberOfShots() && vaccine.getShotInternalVal() < (daysBetween)){
////                    vaccine.setVaccineName(vaccine.getVaccineName()+":" + (shortNum+1));
//                    vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName()+"-" + (shortNum+1));
//                    continue;
//                }
//                if ((appointment.getAppointmentDate().compareTo(currentDate) <= 0 && (appointment.getStatus() == 1 || appointment.getMimicStatus() == 1))) {
//                    if ((appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0)) {
//                        continue;
//                    }
//
//
//                    if(vaccine.getDuration() > Math.abs(daysBetween))
//                        lstNotDueVaccine.add(vaccine.getVaccineId());
//                }
////                vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName());
//            }
//
////            if (appointment.getAppointmentDate().compareTo(currentDate) <= 0 && (appointment.getStatus() == 1 || appointment.getMimicStatus() == 1)){
////                if ( appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0 ) {
////                    continue;
////                }
////                        for ( Vaccine vaccine : appointment.getVaccines()){
////
////                            lstNotDueVaccine.add(vaccine.getVaccineId());
////                        }
////
////            }
//        }
//
//
//        List<Vaccine> lstAllVaccines = vaccinationRepository.findAll();
//        List<Vaccine> lstVacineDue = new ArrayList<>();
//        HashMap<HashMap<Long, String>,List<Vaccine>> res = new HashMap<>();
//
//        for (Vaccine vaccine : lstAllVaccines){
//            if(lstNotDueVaccine.contains(vaccine.getVaccineId())){
//                continue;
//            }
//            lstVacineDue.add(vaccine);
//        }
//        res.put( vacineNameMap ,lstVacineDue);
//
//        return new ResponseEntity<>(res, HttpStatus.OK);
//    }



    public ResponseEntity<?> getVaccineHistory(int patientIdInt, LocalDate currentDate, LocalTime currentTime){

        long patientId = new Long(patientIdInt);
        Set<Vaccine> lstNotDueVaccine = new HashSet<>();
        HashMap <Long, String> vacineNameMap = new HashMap<>();
        List<Appointment> lstAppointments = appointmentRepository.findByPatientMRN(patientId);
        List<VaccinationHistory> responseVaccinationHistory = new ArrayList<>();

        for ( Appointment appointment : lstAppointments) {
            long daysBetween = ChronoUnit.DAYS.between(appointment.getAppointmentDate(), currentDate);
//                    long timeBetween = ChronoUnit.MINUTES.between(appointment.getAppointmentTime() ,currentTime);
            System.out.println("DateDiff : " + daysBetween);
            for (Vaccine vaccine : appointment.getVaccines()) {
                int shortNum = patientVaccinationRepository.findShots(patientId, appointment.getAppointmentDate(), appointment.getAppointmentTime(), vaccine.getVaccineId()).getShotNumber();
                if (shortNum < vaccine.getNumberOfShots() && vaccine.getShotInternalVal() < (daysBetween)) {
//                    vaccine.setVaccineName(vaccine.getVaccineName()+":" + (shortNum+1));
                    vacineNameMap.put(vaccine.getVaccineId(), vaccine.getVaccineName() + "-" + (shortNum));
                    continue;
                }

                if (appointment.getAppointmentDate().compareTo(currentDate) <= 0 && (appointment.getStatus() == 1 || appointment.getMimicStatus() == 1)) {
                    if (appointment.getAppointmentDate().compareTo(currentDate) == 0 && appointment.getAppointmentTime().compareTo(currentTime) > 0) {
                        continue;
                    }

                    lstNotDueVaccine.add(vaccine);
                    VaccinationHistory vaccineHistory = new VaccinationHistory();
                    vaccineHistory.setVaccineID(vaccine.getVaccineId());
                    vaccineHistory.setVaccineName(vaccine.getVaccineName());
                    vaccineHistory.setDiseases(vaccine.getDiseases());
                    vaccineHistory.setShotNumber(shortNum);
                    vaccineHistory.setDateCompleted(appointment.getAppointmentDate());
                    vaccineHistory.setDuration(vaccine.getDuration());
                    vaccineHistory.setNumberOfShots(vaccine.getNumberOfShots());
                    vaccineHistory.setShotInternalVal(vaccine.getShotInternalVal());
                    vaccineHistory.setManufacturer(vaccine.getManufacturer());
                    vaccineHistory.setClinicName(appointment.getClinic().getClinicName());
                    responseVaccinationHistory.add(vaccineHistory);

                }
            }
        }

//        List<Vaccine> lstAllVaccines = vaccinationRepository.findAll();
//        List<Vaccine> lstVacineDue = new ArrayList<>();
//
//        for (Vaccine vaccine : lstAllVaccines){
//            if(lstNotDueVaccine.contains(vaccine.getVaccineId())){
//                continue;
//            }
//            lstVacineDue.add(vaccine);
//        }
        HashMap<HashMap<Long, String>,Set<Vaccine>> res = new HashMap<>();
        res.put( vacineNameMap ,lstNotDueVaccine);
        return new ResponseEntity<>(responseVaccinationHistory, HttpStatus.OK);
    }



}
