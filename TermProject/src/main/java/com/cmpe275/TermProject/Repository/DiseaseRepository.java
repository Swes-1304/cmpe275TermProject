package com.cmpe275.TermProject.Repository;

import com.cmpe275.TermProject.Models.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiseaseRepository extends JpaRepository<Disease, String> {

    @Query("SELECT d.diseaseName from Disease d WHERE d.diseaseName =?1")
    Disease findByName(String name);

}
