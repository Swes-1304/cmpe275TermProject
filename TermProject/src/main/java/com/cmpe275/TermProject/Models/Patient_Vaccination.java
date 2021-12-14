package com.cmpe275.TermProject.Models;


import javax.persistence.*;

import java.util.*;

import java.time.*;

@Entity
public class Patient_Vaccination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long patientVaccinationId;
    @ManyToOne(targetEntity = Patient.class , cascade = CascadeType.DETACH)
    private Patient patient;
    @ManyToOne(targetEntity = Vaccine.class)
    private Vaccine vaccine;
    @OneToOne(targetEntity = Clinic.class)    
    private Clinic clinic;

    private int shotNumber;
    //@Column(columnDefinition = "TIMESTAMP DEFAULT (CONVERT_TZ(NOW(),'UTC', 'US/Pacific'))")
    private LocalDate vaccinationDate;
    private LocalTime vaccinationTime;

    public Patient_Vaccination() {}
    public Patient_Vaccination(Patient patient, Vaccine vaccine, int shotNumber, LocalDate vaccinationDate, LocalTime vaccinationTime) {
        this.patient = patient;
        this.vaccine = vaccine;
        this.shotNumber = shotNumber;
        this.vaccinationDate = vaccinationDate;
        this.vaccinationTime = vaccinationTime;
    }

    public void setPatientVaccinationId(long patientVaccinationId) {
        this.patientVaccinationId = patientVaccinationId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Vaccine getVaccine() {
        return vaccine;
    }

    public void setVaccine(Vaccine vaccine) {
        this.vaccine = vaccine;
    }

    public int getShotNumber() {
        return shotNumber;
    }

    public void setShotNumber(int shotNumber) {
        this.shotNumber = shotNumber;
    }

    public LocalDate getVaccinationDate() {
        return vaccinationDate;
    }

    public void setVaccinationDate(LocalDate vaccinationDate) {
        this.vaccinationDate = vaccinationDate;
    }
    
    public LocalTime getVaccinationTime() {
        return vaccinationTime;
    }

    public void setVaccinationTime(LocalTime vaccinationTime) {
        this.vaccinationTime = vaccinationTime;
    }
    
	public void setClinic(Clinic clinic) {
		this.clinic = clinic;		
	}
	public Clinic getClinic() {
		return clinic;		
	}
	public long getPatientVaccinationId() {
		// TODO Auto-generated method stub
		return patientVaccinationId;
	}
	
}
