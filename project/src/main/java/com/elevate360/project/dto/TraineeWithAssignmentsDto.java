package com.elevate360.project.dto;

import com.elevate360.project.entity.User;

import java.util.List;

public class TraineeWithAssignmentsDto {
    private User trainee;
    private List<TrainerTraineeAssignmentDto> assignments;

    // Constructor, getters and setters

    public TraineeWithAssignmentsDto(User trainee, List<TrainerTraineeAssignmentDto> assignments) {
        this.trainee = trainee;
        this.assignments = assignments;
    }

    public User getTrainee() {
        return trainee;
    }

    public void setTrainee(User trainee) {
        this.trainee = trainee;
    }

    public List<TrainerTraineeAssignmentDto> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<TrainerTraineeAssignmentDto> assignments) {
        this.assignments = assignments;
    }
}

