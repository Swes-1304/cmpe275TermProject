package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Transactional(rollbackFor = SQLException.class)
public interface PatientRepository extends JpaRepository<Patient, String> {

    @Query("SELECT p from Patient p WHERE p.email =?1")
    Patient findByEmail(String email);
}
