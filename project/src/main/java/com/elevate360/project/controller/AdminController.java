package com.elevate360.project.controller;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200/")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // Get all trainers
    @GetMapping("/trainers")
    public List<User> getAllTrainers() {
        return userRepository.findByRole("trainer");
    }

    // Get all trainees
    @GetMapping("/trainee")
    public List<User> getAllTrainees() {
        return userRepository.findByRole("trainee");
    }

    @DeleteMapping("/trainers/{id}")
    public void deleteTrainer(@PathVariable Long id) {
        // Check if the user exists and has the role 'trainer'
        User trainer = userRepository.findById(id).orElse(null);
        if (trainer != null && "trainer".equals(trainer.getRole())) {
            userRepository.deleteById(id);
        }
    }

    // Delete a trainee by ID
    @DeleteMapping("/trainees/{id}")
    public void deleteTrainee(@PathVariable Long id) {
        // Check if the user exists and has the role 'trainee'
        User trainee = userRepository.findById(id).orElse(null);
        if (trainee != null && "trainee".equals(trainee.getRole())) {
            userRepository.deleteById(id);
        }
    }

    // Update a trainer by ID
    @PutMapping("/trainers/{id}")
    public User updateTrainer(@PathVariable Long id, @RequestBody User updatedTrainer) {
        User trainer = userRepository.findById(id).orElse(null);
        if (trainer != null && "trainer".equals(trainer.getRole())) {
            // Update fields
            trainer.setUsername(updatedTrainer.getUsername());
            trainer.setEmail(updatedTrainer.getEmail());
            trainer.setPassword(updatedTrainer.getPassword());
            trainer.setSpecialization(updatedTrainer.getSpecialization());
            trainer.setDesignation(updatedTrainer.getDesignation());
            // Save updated trainer
            return userRepository.save(trainer);
        }
        return null;  // If trainer not found or role mismatch
    }

    // Update a trainee by ID
    @PutMapping("/trainees/{id}")
    public User updateTrainee(@PathVariable Long id, @RequestBody User updatedTrainee) {
        User trainee = userRepository.findById(id).orElse(null);
        if (trainee != null && "trainee".equals(trainee.getRole())) {
            // Update fields
            trainee.setUsername(updatedTrainee.getUsername());
            trainee.setEmail(updatedTrainee.getEmail());
            trainee.setPassword(updatedTrainee.getPassword());
            trainee.setSpecialization(updatedTrainee.getSpecialization());
            trainee.setDesignation(updatedTrainee.getDesignation());
            // Save updated trainee
            return userRepository.save(trainee);
        }
        return null;  // If trainee not found or role mismatch
    }
}

