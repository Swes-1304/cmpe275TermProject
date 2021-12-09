package com.cmpe275.TermProject.Models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appointmentId;
    @ManyToOne(targetEntity = Patient.class)
    private Patient patient;
    @ManyToOne(targetEntity = Clinic.class)
    private Clinic clinic;
    @ManyToOne (targetEntity = Vaccine.class)
    private List<Vaccine> vaccines;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
//    1 for checkedin and 0 for no show
    private boolean status;

    public Appointment(){}

    public Appointment(Patient patient, Clinic clinic, List<Vaccine> vaccines, LocalDate appointmentDate, LocalTime appointmentTime, boolean status) {
        this.patient = patient;
        this.clinic = clinic;
        this.vaccines = vaccines;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public List<Vaccine> getVaccines() {
        return vaccines;
    }

    public void setVaccines(List<Vaccine> vaccines) {
        this.vaccines = vaccines;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
