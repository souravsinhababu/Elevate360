package com.elevate360.project.controller.dashboard;

import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200/")
public class TraineeController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/trainees/{traineeId}/assign/{trainerId}")
    public ResponseEntity<User> assignTraineeToTrainer(@PathVariable Long traineeId, @PathVariable Long trainerId) {
        User trainee = userRepository.findById(traineeId).orElse(null);
        User trainer = userRepository.findById(trainerId).orElse(null);

        if (trainee != null && trainer != null && "trainee".equals(trainee.getRole()) && "trainer".equals(trainer.getRole())) {
            trainee.setTrainer(trainer);
            User updatedTrainee = userRepository.save(trainee);
            return ResponseEntity.ok(updatedTrainee);
        }

        return ResponseEntity.status(404).body(null); // Return 404 if trainee or trainer is not found
    }
    @GetMapping("/trainers/{id}/trainees")
    public List<User> getTraineesByTrainer(@PathVariable Long id) {
        User trainer = userRepository.findById(id).orElse(null);
        if (trainer != null && "trainer".equals(trainer.getRole())) {
            return userRepository.findByTrainer(trainer);
        }
        return null;
    }
}
