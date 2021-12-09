package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Transactional(rollbackFor = SQLException.class)
public interface ClinicRepository extends JpaRepository<Clinic, Long> {

}
