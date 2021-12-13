package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Patient_Vaccination;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Models.Vaccine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.*;
import java.util.List;

@Transactional(rollbackFor = SQLException.class)
public interface PatientVaccinationRepository extends JpaRepository<Patient_Vaccination, Long> {
	 @Query("SELECT pv from Patient_Vaccination pv WHERE pv.patient.mrn =?1 and pv.vaccinationDate = ?2 and vaccinationTime = ?3")
	 List<Patient_Vaccination> findByMrn(long mrn, LocalDate appointmentDate, LocalTime appointmentTime);
	  
	
}
