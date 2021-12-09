package com.cmpe275.TermProject.Models;


import javax.persistence.*;
import java.time.LocalTime;

@Entity
public class Patient_Vaccination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long patientVaccinationId;
    @ManyToOne(targetEntity = Patient.class , cascade = CascadeType.DETACH)
    private Patient patient;
    @ManyToOne(targetEntity = Vaccine.class)
    private Vaccine vaccine;

    private int shotNumber;
    @Column(columnDefinition = "TIMESTAMP DEFAULT (CONVERT_TZ(NOW(),'UTC', 'US/Pacific'))")
    private LocalTime vaccinationDate;

    public Patient_Vaccination() {}
    public Patient_Vaccination(Patient patient, Vaccine vaccine, int shotNumber, LocalTime vaccinationDate) {
        this.patient = patient;
        this.vaccine = vaccine;
        this.shotNumber = shotNumber;
        this.vaccinationDate = vaccinationDate;
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

    public LocalTime getVaccinationDate() {
        return vaccinationDate;
    }

    public void setVaccinationDate(LocalTime vaccinationDate) {
        this.vaccinationDate = vaccinationDate;
    }
}
