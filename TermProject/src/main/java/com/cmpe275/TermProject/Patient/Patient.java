package com.cmpe275.TermProject.Patient;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Patient {

    @Id
    private int mrn;// Medical Record Number
    private String email;
    private String firstName;
    private String middleName;
    private String lastName;
    private String DOB;
    private String Address; // changes to me made;
    private String gender;
    private boolean adminBoolean;
    private String password;

    public Patient(){

    }


    // Add getter Setter and constructor


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Patient(int mrn, String email, String firstName, String middleName, String lastName, String DOB, String address, String gender, boolean adminBoolean, String password) {
        this.mrn = mrn;
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.DOB = DOB;
        Address = address;
        this.gender = gender;
        this.adminBoolean = adminBoolean;
        this.password = password;
    }

    public int getMrn() {
        return mrn;
    }

    public void setMrn(int mrn) {
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

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
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
}
