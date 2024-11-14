package com.elevate360.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Trainer {

    @Id
    private String trainerEmail;
    private String trainerUserName;
    private String trainerPassword;
    private String trainerSpecialization;
}
