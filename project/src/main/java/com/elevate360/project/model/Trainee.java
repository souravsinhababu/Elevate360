package com.elevate360.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Trainee {

    @Id
    private String traineeEmail;
    private String traineeName;
    private String traineePassword;
    private String traineeMobileNumber;
    private String traineeFirstName;
    private String traineeLastName;
    private String traineeDesignation;
}
