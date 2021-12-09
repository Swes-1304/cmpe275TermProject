package com.cmpe275.TermProject.Models;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long clinicId;
    @Column(unique = true)
    private String clinicName;
    @Embedded
    private Address address;
    @Column(columnDefinition = "TIME DEFAULT '06:00:00'")
    private LocalTime businessHoursStart;
    @Column(columnDefinition = "TIME DEFAULT '18:00:00'")
    private LocalTime businessHoursEnd;
    private int numberOfPhysicians;
    @OneToMany(targetEntity = Appointment.class, cascade = CascadeType.DETACH)
    private List<Appointment> clinicAppointments;

    public Clinic(){}

    public Clinic(String clinicName, Address address, LocalTime businessHoursStart, LocalTime businessHoursEnd, int numberOfPhysicians, List<Appointment> clinicAppointments) {
        this.clinicName = clinicName;
        this.address = address;
        this.businessHoursStart = businessHoursStart;
        this.businessHoursEnd = businessHoursEnd;
        this.numberOfPhysicians = numberOfPhysicians;
        this.clinicAppointments = clinicAppointments;
    }

    public String getClinicName() {
        return clinicName;
    }

    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalTime getBusinessHoursStart() {
        return businessHoursStart;
    }

    public void setBusinessHoursStart(LocalTime businessHoursStart) {
        this.businessHoursStart = businessHoursStart;
    }

    public LocalTime getBusinessHoursEnd() {
        return businessHoursEnd;
    }

    public void setBusinessHoursEnd(LocalTime businessHoursEnd) {
        this.businessHoursEnd = businessHoursEnd;
    }

    public int getNumberOfPhysicians() {
        return numberOfPhysicians;
    }

    public void setNumberOfPhysicians(int numberOfPhysicians) {
        this.numberOfPhysicians = numberOfPhysicians;
    }

    public List<Appointment> getClinicAppointments() {
        return clinicAppointments;
    }

    public void setClinicAppointments(List<Appointment> clinicAppointments) {
        this.clinicAppointments = clinicAppointments;
    }
}
