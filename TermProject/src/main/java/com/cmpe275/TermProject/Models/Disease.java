package com.cmpe275.TermProject.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long diseaseId;
    private String diseaseName;
    private String diseaseDescription;

    public Disease(){}

    public Disease(String diseaseName, String diseaseDescription) {
        this.diseaseName = diseaseName;
        this.diseaseDescription = diseaseDescription;
    }

    public Disease(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public long getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(long diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getDiseaseDescription() {
        return diseaseDescription;
    }

    public void setDiseaseDescription(String diseaseDescription) {
        this.diseaseDescription = diseaseDescription;
    }
}