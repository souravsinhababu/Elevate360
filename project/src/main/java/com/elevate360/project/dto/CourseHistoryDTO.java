package com.elevate360.project.dto;

import java.time.LocalDate;

public class CourseHistoryDTO {

    private String courseName;
    private Long trainerId;
    private String trainerName;
    private LocalDate startDate;
    private LocalDate endDate;

    public CourseHistoryDTO(String courseName, Long trainerId, String trainerName, LocalDate startDate, LocalDate endDate) {
        this.courseName = courseName;
        this.trainerId = trainerId;
        this.trainerName = trainerName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters
    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
