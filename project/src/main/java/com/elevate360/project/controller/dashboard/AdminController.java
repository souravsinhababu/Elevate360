package com.elevate360.project.controller.dashboard;

import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import com.elevate360.project.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Get all trainers
    @GetMapping("/trainers")
    public List<User> getAllTrainers() {
        return userRepository.findByRole("trainer");
    }

    // Get all trainees with trainer information
    @GetMapping("/trainee")
    public List<User> getAllTrainees() {
        // Fetch all trainees from the repository
        List<User> trainees = userRepository.findByRole("trainee");
        return trainees;
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
    @Transactional
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

    // Add a new trainer
    @PostMapping("/addtrainer")
    public ResponseEntity<User> addTrainer(@RequestBody User user) {
        user.setRole("trainer");
        User savedUser = userService.signup(user);
        return ResponseEntity.ok(savedUser);
    }

    // Add a new trainee
    @PostMapping("/addtrainee")
    public ResponseEntity<User> addTrainee(@RequestBody User user) {
        user.setRole("trainee");
        User savedUser = userService.signup(user);
        return ResponseEntity.ok(savedUser);
    }

    // Assign a trainee to a trainer
    @PutMapping("/trainees/{traineeId}/assign/{trainerId}")
    public ResponseEntity<User> assignTraineeToTrainer(@PathVariable Long traineeId, @PathVariable Long trainerId) {
        User trainee = userRepository.findById(traineeId).orElse(null);
        User trainer = userRepository.findById(trainerId).orElse(null);

        if (trainee != null && trainer != null && "trainee".equals(trainee.getRole()) && "trainer".equals(trainer.getRole())) {
            // Instead of setting a string, assign the full User (trainer) object
            trainee.setTrainer(trainer);  // Set the trainer (which is a User object)

            // Save the updated trainee
            User updatedTrainee = userRepository.save(trainee);

            return ResponseEntity.ok(updatedTrainee);  // Return the updated trainee object
        }

        return ResponseEntity.status(404).body(null);  // Return 404 if trainee or trainer is not found
    }

    // Get all trainees assigned to a specific trainer
    @GetMapping("/trainers/{id}/trainees")
    public List<User> getTraineesByTrainer(@PathVariable Long id) {
        // Fetch the trainer by id
        User trainer = userRepository.findById(id).orElse(null);

        // If the trainer exists and has the role 'trainer'
        if (trainer != null && "trainer".equals(trainer.getRole())) {
            // Fetch the list of trainees assigned to this trainer
            return userRepository.findByTrainer(trainer);  // Return all trainees for this trainer
        }
        return null;  // Return null if trainer is not found or role mismatch
    }
}
