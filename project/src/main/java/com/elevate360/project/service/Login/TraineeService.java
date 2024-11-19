package com.elevate360.project.service;

import com.elevate360.project.model.Trainee;
import com.elevate360.project.model.courselist.CourseList;
import com.elevate360.project.repo.TraineeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class TraineeService {

    @Autowired
    private TraineeRepo traineeRepo;

    // Method to add Trainee
    public void addTrainee(Trainee trainee) {
        traineeRepo.save(trainee);
    }

    // Method to show all trainees
    public List<Trainee> showTraineeDetails() {
        return traineeRepo.findAll();
    }

    // Method to return relevant and irrelevant courses based on designation
    public CourseList getRelevantAndIrrelevantCourses(String designation) {
        // Define Frontend and Backend courses
        List<String> frontendCourses = List.of("HTML", "CSS", "JavaScript", "React", "Vue");
        List<String> backendCourses = List.of("Java", "Spring Boot", "Node.js", "Python", "SQL");

        CourseList courseList = new CourseList();

        if ("frontend".equalsIgnoreCase(designation)) {
            courseList.setRelevantCourses(frontendCourses);
            courseList.setIrrelevantCourses(backendCourses);
        } else if ("backend".equalsIgnoreCase(designation)) {
            courseList.setRelevantCourses(backendCourses);
            courseList.setIrrelevantCourses(frontendCourses);
        } else {
            courseList.setRelevantCourses(new ArrayList<>());
            courseList.setIrrelevantCourses(new ArrayList<>());
        }

        return courseList;
    }

    // Method for Trainee login
    public Object loginTrainee(String email, String password) {
        Optional<Trainee> traineeOpt = traineeRepo.findById(email); // Assuming email is the ID in DB

        if (traineeOpt.isPresent()) {
            Trainee trainee = traineeOpt.get();
            if (trainee.getTraineePassword().equals(password)) {
                // After successful login, return the relevant and irrelevant courses
                return getRelevantAndIrrelevantCourses(trainee.getTraineeDesignation());
            } else {
                return "Invalid password";
            }
        } else {
            return "Trainee not found";
        }
    }
}