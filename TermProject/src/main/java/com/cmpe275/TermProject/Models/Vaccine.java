package com.cmpe275.TermProject.Models;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long vaccineId;
    @Column(unique = true)
    private String vaccineName;
    @OneToMany(targetEntity= Disease.class)
    private List<Disease> diseases;
    @Size(min = 3)
    private String Manufacturer;
    @Column(columnDefinition = "integer default 1")
    private int numberOfShots;
    private int shotInternalVal;
// integer max value (Integer.MAX_VALUE;) to indicate life time validity
    private int duration;

    public Vaccine(){}

    public Vaccine(String vaccineName, List<Disease> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration) {
        this.vaccineName = vaccineName;
        this.diseases = diseases;
        Manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
    }

    public Vaccine(String vaccineName, List<Disease> diseases, String manufacturer, int numberOfShots, int duration) {
        this.vaccineName = vaccineName;
        this.diseases = diseases;
        Manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.duration = duration;
    }

    public long getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(long vaccineId) {
        this.vaccineId = vaccineId;
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
}
