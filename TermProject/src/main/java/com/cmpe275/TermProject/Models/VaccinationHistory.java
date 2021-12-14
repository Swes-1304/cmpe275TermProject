package com.cmpe275.TermProject.Models;

import java.time.LocalDate;
import java.util.List;

public class VaccinationHistory {
    private long vaccineID;
    private String vaccineName;
    private List<Disease> diseases;
    private String Manufacturer;
    private int numberOfShots;
    private int shotInternalVal;
    private int duration;
    private LocalDate dateCompleted;
    private int shotNumber;

    public VaccinationHistory(){}

    public VaccinationHistory(long vaccineID, String vaccineName, List<Disease> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration, LocalDate dateCompleted, int shotNumber) {
        this.vaccineID = vaccineID;
        this.vaccineName = vaccineName;
        this.diseases = diseases;
        Manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
        this.dateCompleted = dateCompleted;
        this.shotNumber = shotNumber;
    }

    public long getVaccineID() {
        return vaccineID;
    }

    public void setVaccineID(long vaccineID) {
        this.vaccineID = vaccineID;
    }

    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public List<Disease> getDiseases() {
        return diseases;
    }

    public void setDiseases(List<Disease> diseases) {
        this.diseases = diseases;
    }

    public String getManufacturer() {
        return Manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        Manufacturer = manufacturer;
    }

    public int getNumberOfShots() {
        return numberOfShots;
    }

    public void setNumberOfShots(int numberOfShots) {
        this.numberOfShots = numberOfShots;
    }

    public int getShotInternalVal() {
        return shotInternalVal;
    }

    public void setShotInternalVal(int shotInternalVal) {
        this.shotInternalVal = shotInternalVal;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public int getShotNumber() {
        return shotNumber;
    }

    public void setShotNumber(int shotNumber) {
        this.shotNumber = shotNumber;
    }
}
