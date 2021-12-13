package com.cmpe275.TermProject.Models;
import java.time.LocalDate;
import java.util.List;

public class VaccinationDue {
    private long vaccineID;
    private String vaccineName;
    private List<Disease> diseases;
    private String Manufacturer;
    private int numberOfShots;
    private int shotInternalVal;
    private int duration;
    private LocalDate dueDate;

    public VaccinationDue(){}
    public VaccinationDue(long vaccineID, String vaccineName, List<Disease> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration, LocalDate dueDate) {
        this.vaccineID = vaccineID;
        this.vaccineName = vaccineName;
        this.diseases = diseases;
        Manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
        this.dueDate = dueDate;
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

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}
