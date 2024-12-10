package com.elevate360.project.dto;

import java.time.LocalDate;
import java.util.List;

public class TrainerTraineeAssignmentDto {
    private String trainerName;
    private List<CourseDetailsDto> assignedCourses;

    // Constructor
    public TrainerTraineeAssignmentDto(String trainerName, List<CourseDetailsDto> assignedCourses) {
        this.trainerName = trainerName;
        this.assignedCourses = assignedCourses;
    }

    // Getters and Setters
    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public List<CourseDetailsDto> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(List<CourseDetailsDto> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }

    // Inner class for course details
    public static class CourseDetailsDto {
        private String courseName;
        private LocalDate startDate;
        private LocalDate endDate;

        // Constructor
        public CourseDetailsDto(String courseName, LocalDate startDate, LocalDate endDate) {
            this.courseName = courseName;
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
}
