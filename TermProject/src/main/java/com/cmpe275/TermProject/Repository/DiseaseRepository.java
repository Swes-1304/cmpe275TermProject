package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Transactional(rollbackFor = SQLException.class)
public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    @Query("SELECT d from Disease d WHERE d.diseaseName =?1")
    Disease findByName(String name);

}
