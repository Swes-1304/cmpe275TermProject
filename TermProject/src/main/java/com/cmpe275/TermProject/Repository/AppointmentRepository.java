package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Appointment;
import com.cmpe275.TermProject.Models.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Transactional(rollbackFor = SQLException.class)
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	//@Query("SELECT * from Appointment WHERE Patient =?")
    //Appointment findByPatientId(Patient patient);
}
