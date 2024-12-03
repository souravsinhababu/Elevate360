package com.elevate360.project.service;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.dto.TraineeDTO;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get all users by role (e.g., "trainer", "trainee")
    public List<User> getAllUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    // Delete user by ID and role
    public ResponseEntity<Void> deleteUserByIdAndRole(Long id, String role) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent() && role.equals(user.get().getRole())) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.status(404).build(); // 404 Not Found
    }

    // Update user by ID and role
    public ResponseEntity<User> updateUserByIdAndRole(Long id, User updatedUser, String role) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent() && role.equals(userOptional.get().getRole())) {
            User user = userOptional.get();
            // Update the fields from updatedUser
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setSpecialization(updatedUser.getSpecialization());
            user.setDesignation(updatedUser.getDesignation());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).build(); // 404 Not Found
    }

    // Add a new user (signup)
    public ResponseEntity<User> signup(User user) {
        // Check if a user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).build(); // 409 Conflict if the user already exists
        }

        if (user.getRole() == null) {
            user.setRole("TRAINEE"); // Set default role if not provided
        }

        // Save and return the new user
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // Login method to validate user credentials
    public ResponseEntity<User> login(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        }

        // Return unauthorized if credentials don't match
        return ResponseEntity.status(401).build(); // 401 Unauthorized
    }

    // Add a new user (e.g., for admin to create trainers/trainees)
    public ResponseEntity<User> addUser(User user) {
        User savedUser = userRepository.save(user);
        if (savedUser != null) {
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.status(500).build(); // 500 Internal Server Error
    }

    // Assign a trainee to a trainer
    public ResponseEntity<User> assignTraineeToTrainer(Long traineeId, Long trainerId) {
        Optional<User> traineeOptional = userRepository.findById(traineeId);
        Optional<User> trainerOptional = userRepository.findById(trainerId);

        if (traineeOptional.isPresent() && trainerOptional.isPresent() &&
                "trainee".equals(traineeOptional.get().getRole()) && "trainer".equals(trainerOptional.get().getRole())) {
            User trainee = traineeOptional.get();
            User trainer = trainerOptional.get();

            // Assign the trainer to the trainee
            trainee.setTrainer(trainer);

            User updatedTrainee = userRepository.save(trainee);
            return ResponseEntity.ok(updatedTrainee);
        }
        return ResponseEntity.status(404).body(null); // 404 Not Found
    }
    public String assignTraineesToTrainer(Long trainerId, AssignTraineesRequest request) {
        User trainer = userRepository.findById(trainerId).orElse(null);
        if (trainer == null || !"trainer".equals(trainer.getRole())) {
            return "Trainer not found or invalid role";
        }

        for (Long traineeId : request.getTraineeIds()) {
            User trainee = userRepository.findById(traineeId).orElse(null);
            if (trainee != null && "trainee".equals(trainee.getRole())) {
                trainee.setTrainer(trainer);
                userRepository.save(trainee);
            }
        }

        return "Trainees successfully assigned to trainer";
    }

    // Get all trainees assigned to a specific trainer
    public List<TraineeDTO> getTraineesByTrainer(Long trainerId) {
        User trainer = userRepository.findById(trainerId).orElse(null);
        if (trainer == null || !"trainer".equals(trainer.getRole())) {
            return null; // Return null if trainer not found or not a trainer
        }

        List<User> trainees = userRepository.findTraineesByTrainerId(trainerId);

        return trainees.stream()
                .map(trainee -> new TraineeDTO(trainee.getUsername(), trainee.getEmail(), trainee.getSpecialization()))
                .collect(Collectors.toList());
    }


    //Trainer Dashboard


    // Get trainees by trainer ID
    public List<User> getTraineesByTrainerId(Long trainerId) {
        Optional<User> trainerOptional = userRepository.findById(trainerId);
        if (trainerOptional.isPresent() && "trainer".equals(trainerOptional.get().getRole())) {
            return userRepository.findByTrainer(trainerOptional.get());
        }
        return null; // Return null if trainer not found or role mismatch
    }
}
