package com.elevate360.project.service;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.dto.EditProfile.AdminUpdateRequest;
import com.elevate360.project.dto.TraineeDTO;
import com.elevate360.project.entity.TrainerTraineeAssignment;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.TrainerTraineeAssignmentRepo;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

            // Only update allowed fields and ignore @JsonIgnore fields like password, etc.
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());

            // Avoid updating fields that are sensitive
            if (updatedUser.getSpecialization() != null) {
                user.setSpecialization(updatedUser.getSpecialization());
            }

            if (updatedUser.getDesignation() != null) {
                user.setDesignation(updatedUser.getDesignation());
            }

            // Save the updated user
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).build(); // 404 Not Found
    }


    // Add a new user (signup)


// Method to check if the user exists by email
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Method to signup the user
    public User signup(User user) {
        // You can also hash the password before saving (considering security)
        return userRepository.save(user);
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

//    New code
    @Autowired
    private TrainerTraineeAssignmentRepo assignmentRepository;

     //Assign a trainee to a trainer with checking existing assignments
    public ResponseEntity<User> assignTraineeToTrainer(Long traineeId, Long trainerId) {
        Optional<User> traineeOptional = userRepository.findById(traineeId);
        Optional<User> trainerOptional = userRepository.findById(trainerId);

        if (traineeOptional.isPresent() && trainerOptional.isPresent() &&
                "trainee".equals(traineeOptional.get().getRole()) && "trainer".equals(trainerOptional.get().getRole())) {

            User trainee = traineeOptional.get();
            User trainer = trainerOptional.get();

            // Check if trainer already has assigned trainees
            List<User> existingTrainees = userRepository.findByTrainer(trainer);

            if (!existingTrainees.isEmpty()) {
                // Store the assignment in the new table
                TrainerTraineeAssignment assignment = new TrainerTraineeAssignment();
                assignment.setTrainer(trainer);
                assignment.setTrainee(trainee);
                assignment.setTrainerName(trainer.getUsername());
                assignment.setTrainerSpecialization(trainer.getSpecialization());

                assignmentRepository.save(assignment);
            }

            // Assign the trainer to the trainee
            trainee.setTrainer(trainer);
            userRepository.save(trainee);

            return ResponseEntity.ok(trainee);
        }

        return ResponseEntity.status(404).body(null);
    }

    // Method to unassign the trainer from the trainee
    public String unassignTrainerFromTrainee(Long traineeId) {
        // Fetch the trainee from the database
        User trainee = userRepository.findById(traineeId)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));

        // Check if the trainee has a trainer assigned
        if (trainee.getTrainer() != null) {
            // Unassign the trainer (set trainer to null)
            trainee.setTrainer(null);
            userRepository.save(trainee);  // Save the updated trainee

            // Trainee Trainee assignment table (make it as Zero)
            return "Trainer successfully unassigned from the trainee.";
        } else {
            // If the trainee does not have a trainer assigned
            return "Trainee is not assigned to any trainer.";
        }
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

    // Method to update admin's email and password
    public ResponseEntity<User> editAdminEmailAndPassword(Long id, AdminUpdateRequest updateRequest) {
        Optional<User> userOptional = userRepository.findById(id);

        // Check if the user exists and is an admin
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Ensure the user is an admin
            if ("admin".equals(user.getRole())) {
                // Update email and password
                user.setEmail(updateRequest.getEmail());
                user.setPassword(updateRequest.getPassword());

                // Save the updated user
                userRepository.save(user);

                return ResponseEntity.ok(user); // Return the updated admin
            } else {
                return ResponseEntity.status(403).build(); // Forbidden if not an admin
            }
        }

        return ResponseEntity.status(404).build(); // Not Found if user does not exist
    }
}
