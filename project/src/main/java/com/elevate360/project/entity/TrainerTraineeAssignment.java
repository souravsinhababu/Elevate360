package com.elevate360.project.entity;

import jakarta.persistence.*;

@Entity
public class TrainerTraineeAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private User trainer;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private User trainee;

    private String trainerName;
    private String trainerSpecialization;

    // Constructors, getters, setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getTrainer() {
        return trainer;
    }

    public void setTrainer(User trainer) {
        this.trainer = trainer;
    }

    public User getTrainee() {
        return trainee;
    }

    public void setTrainee(User trainee) {
        this.trainee = trainee;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getTrainerSpecialization() {
        return trainerSpecialization;
    }

    public void setTrainerSpecialization(String trainerSpecialization) {
        this.trainerSpecialization = trainerSpecialization;
    }
}

