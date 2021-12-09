package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Transactional(rollbackFor = SQLException.class)
public interface VaccinationRepository extends JpaRepository<Vaccine, Long> {

    @Query("SELECT v from Vaccine v WHERE v.vaccineName =?1")
    Vaccine findByName(String name);


}
