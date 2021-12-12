package com.cmpe275.TermProject.Models;

import com.cmpe275.TermProject.Models.Address;
import com.cmpe275.TermProject.Models.Appointment;
import com.cmpe275.TermProject.Models.Vaccine;

import javax.persistence.*;
import java.util.List;

@Entity
public class Patient {

    @Id
    private long mrn;// Medical Record Number
    private String email;
    private String firstName;
    private String middleName;
    private String lastName;
    private String DOB;
    @Embedded
    private Address address; // Embedded,
//    private String Address; // changes to me made;
    private String gender;
    private boolean adminBoolean;
    private String password;
    //for google auth
    private String googleSubId; // not added to the constructor

    public String getGoogleSubId() {
        return googleSubId;
    }

    public void setGoogleSubId(String googleSubId) {
        this.googleSubId = googleSubId;
    }
//    @OneToMany(targetEntity = Vaccine.class)
//    private List<Vaccine> vaccinations;

    @OneToMany(targetEntity = Appointment.class, cascade = CascadeType.DETACH)
    private List<Appointment> appointments;
    public Patient(){

    }

    public Patient(int mrn, String email, String firstName, String middleName, String lastName, String DOB, Address address, String gender, boolean adminBoolean, String password, String googleSubId, List<Vaccine> vaccinations, List<Appointment> appointments) {
        this.mrn = mrn;
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.address = address;
        this.gender = gender;
        this.adminBoolean = adminBoolean;
        this.password = password;
//        this.vaccinations = vaccinations;
        this.appointments = appointments;
    }



    // Add getter Setter and constructor


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public long getMrn() {
        return mrn;
    }

    public void setMrn(long mrn) {
        this.mrn = mrn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isAdminBoolean() {
        return adminBoolean;
    }

    public void setAdminBoolean(boolean adminBoolean) {
        this.adminBoolean = adminBoolean;
    }

//    public List<Vaccine> getVaccinations() {
//        return vaccinations;
//    }
//
//    public void setVaccinations(List<Vaccine> vaccinations) {
//        this.vaccinations = vaccinations;
//    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
