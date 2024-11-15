package com.elevate360.project.service;

import com.elevate360.project.model.Trainee;
import com.elevate360.project.repo.TraineeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // Method for Trainee login
    public String loginTrainee(String email, String password) {
        Optional<Trainee> traineeOpt = traineeRepo.findById(email); // Assuming email is the ID in DB

        if (traineeOpt.isPresent()) {
            Trainee trainee = traineeOpt.get();
            if (trainee.getTraineePassword().equals(password)) {
                return "Login successful";
            } else {
                return "Invalid password";
            }
        } else {
            return "Trainee not found";
        }
    }
}
