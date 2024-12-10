package com.elevate360.project.dto;


import com.elevate360.project.entity.User;

import java.util.List;

public class CourseHistoryResponse {
    private String trainerName;
    private List<User.AssignedCourse> assignedCourses;

    // Constructor
    public CourseHistoryResponse(String trainerName, List<User.AssignedCourse> assignedCourses) {
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

    public List<User.AssignedCourse> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(List<User.AssignedCourse> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }
}

