package com.elevate360.project.dto;

import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.entity.User;

import java.util.List;

public class CourseAssignmentResponse {

    private List<User.AssignedCourse> assignedCourses;
    private List<TrainingList> availableCourses;

    public CourseAssignmentResponse(List<User.AssignedCourse> assignedCourses, List<TrainingList> availableCourses) {
        this.assignedCourses = assignedCourses;
        this.availableCourses = availableCourses;
    }

    // Getters and Setters
    public List<User.AssignedCourse> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(List<User.AssignedCourse> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }

    public List<TrainingList> getAvailableCourses() {
        return availableCourses;
    }

    public void setAvailableCourses(List<TrainingList> availableCourses) {
        this.availableCourses = availableCourses;
    }
}
