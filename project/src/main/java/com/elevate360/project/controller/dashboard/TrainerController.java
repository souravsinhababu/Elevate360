package com.elevate360.project.controller.dashboard;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.dto.TraineeDTO;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trainer")
@CrossOrigin(origins = "http://localhost:4200/")
public class TrainerController {

    @Autowired
    private UserRepository userRepository;

    // Assign multiple trainees to a trainer
    @PutMapping("/trainers/{trainerId}/assignTrainees")
    public ResponseEntity<String> assignTraineesToTrainer(
            @PathVariable Long trainerId,
            @RequestBody AssignTraineesRequest request) {

        User trainer = userRepository.findById(trainerId).orElse(null);
        if (trainer == null || !"trainer".equals(trainer.getRole())) {
            return ResponseEntity.status(404).body("Trainer not found or invalid role");
        }

        for (Long traineeId : request.getTraineeIds()) {
            User trainee = userRepository.findById(traineeId).orElse(null);
            if (trainee != null && "trainee".equals(trainee.getRole())) {
                trainee.setTrainer(trainer);
                userRepository.save(trainee);
            }
        }

        return ResponseEntity.ok("Trainees successfully assigned to trainer");
    }
    // Get all trainees assigned to a specific trainer
    @GetMapping("/trainers/{id}/trainees")
    public ResponseEntity<List<TraineeDTO>> getTraineesByTrainer(@PathVariable Long id) {
        User trainer = userRepository.findById(id).orElse(null);

        if (trainer == null || !"trainer".equals(trainer.getRole())) {
            return ResponseEntity.status(404).body(null); // Return 404 if trainer not found or not a trainer
        }

        // Fetch trainees assigned to the trainer
        List<User> trainees = userRepository.findTraineesByTrainerId(id);

        // Map trainees to their names (you can modify this based on what details you want)
//        List<String> traineeNames = trainees.stream()
//                .map(User::getUsername)  // Adjust based on your User class' field for the name
//                .collect(Collectors.toList());

        List<TraineeDTO> traineeDTOs = trainees.stream()
                .map(trainee -> new TraineeDTO(trainee.getUsername(), trainee.getEmail(), trainee.getSpecialization()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(traineeDTOs);
    }

}
