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

    public String getTraineePassword() {
        return traineePassword;
    }

    public void setTraineePassword(String traineePassword) {
        this.traineePassword = traineePassword;
    }

    public String getTraineeName() {
        return traineeName;
    }

    public void setTraineeName(String traineeName) {
        this.traineeName = traineeName;
    }

    public String getTraineeEmail() {
        return traineeEmail;
    }

    public void setTraineeEmail(String traineeEmail) {
        this.traineeEmail = traineeEmail;
    }

    public String getTraineeMobileNumber() {
        return traineeMobileNumber;
    }

    public void setTraineeMobileNumber(String traineeMobileNumber) {
        this.traineeMobileNumber = traineeMobileNumber;
    }

    public String getTraineeFirstName() {
        return traineeFirstName;
    }

    public void setTraineeFirstName(String traineeFirstName) {
        this.traineeFirstName = traineeFirstName;
    }

    public String getTraineeLastName() {
        return traineeLastName;
    }

    public void setTraineeLastName(String traineeLastName) {
        this.traineeLastName = traineeLastName;
    }

    public String getTraineeDesignation() {
        return traineeDesignation;
    }

    public void setTraineeDesignation(String traineeDesignation) {
        this.traineeDesignation = traineeDesignation;
    }

    public Trainee(String traineeEmail, String traineeName, String traineePassword, String traineeMobileNumber, String traineeFirstName, String traineeDesignation, String traineeLastName) {
        this.traineeEmail = traineeEmail;
        this.traineeName = traineeName;
        this.traineePassword = traineePassword;
        this.traineeMobileNumber = traineeMobileNumber;
        this.traineeFirstName = traineeFirstName;
        this.traineeDesignation = traineeDesignation;
        this.traineeLastName = traineeLastName;
    }

    @Override
    public String toString() {
        return "Trainee{" +
                "traineeEmail='" + traineeEmail + '\'' +
                ", traineeName='" + traineeName + '\'' +
                ", traineePassword='" + traineePassword + '\'' +
                ", traineeMobileNumber='" + traineeMobileNumber + '\'' +
                ", traineeFirstName='" + traineeFirstName + '\'' +
                ", traineeLastName='" + traineeLastName + '\'' +
                ", traineeDesignation='" + traineeDesignation + '\'' +
                '}';
    }

    public Trainee(){}
}
