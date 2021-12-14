package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Appointment;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Models.Vaccine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Transactional(rollbackFor = SQLException.class)
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	 @Query("SELECT a from Appointment a WHERE a.patient.mrn =?1")
	    List<Appointment> findByPatientMRN(long mrn);

	@Query("SELECT a from Appointment a WHERE a.clinic.clinicId =?1")
	List<Appointment> findByClinic(long clinicID);
}
