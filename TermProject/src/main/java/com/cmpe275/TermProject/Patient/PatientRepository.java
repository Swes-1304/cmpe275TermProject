package com.cmpe275.TermProject.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<Patient, String> {

    @Query("SELECT p from Patient p WHERE p.email =?1")
    Patient findByEmail(String email);
}
