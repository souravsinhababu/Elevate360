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

    public Trainer(){}

    public Trainer(String trainerEmail, String trainerUserName, String trainerPassword, String trainerSpecialization) {
        this.trainerEmail = trainerEmail;
        this.trainerUserName = trainerUserName;
        this.trainerPassword = trainerPassword;
        this.trainerSpecialization = trainerSpecialization;
    }
    public String getTrainerEmail() {
        return trainerEmail;
    }

    public void setTrainerEmail(String trainerEmail) {
        this.trainerEmail = trainerEmail;
    }

    public String getTrainerUserName() {
        return trainerUserName;
    }

    public void setTrainerUserName(String trainerUserName) {
        this.trainerUserName = trainerUserName;
    }

    public String getTrainerPassword() {
        return trainerPassword;
    }

    public void setTrainerPassword(String trainerPassword) {
        this.trainerPassword = trainerPassword;
    }

    public String getTrainerSpecialization() {
        return trainerSpecialization;
    }

    public void setTrainerSpecialization(String trainerSpecialization) {
        this.trainerSpecialization = trainerSpecialization;
    }


    @Override
    public String toString() {
        return "Trainer{" +
                "trainerEmail='" + trainerEmail + '\'' +
                ", trainerUserName='" + trainerUserName + '\'' +
                ", trainerPassword='" + trainerPassword + '\'' +
                ", trainerSpecialization='" + trainerSpecialization + '\'' +
                '}';
    }
}
