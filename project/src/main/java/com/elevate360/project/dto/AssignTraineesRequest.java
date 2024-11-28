package com.elevate360.project.dto;

import java.util.List;

public class AssignTraineesRequest {
    private List<Long> traineeIds;

    // Getter and Setter
    public List<Long> getTraineeIds() {
        return traineeIds;
    }

    public void setTraineeIds(List<Long> traineeIds) {
        this.traineeIds = traineeIds;
    }
}
