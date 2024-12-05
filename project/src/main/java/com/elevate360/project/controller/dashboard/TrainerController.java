package com.elevate360.project.controller.dashboard;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.dto.TraineeDTO;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import com.elevate360.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trainer")
@CrossOrigin(origins = "*")
public class TrainerController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    // Endpoint to get all trainees assigned to a specific trainer
    @GetMapping("/{trainerId}/trainees")
    public ResponseEntity<List<User>> getTraineesByTrainer(@PathVariable Long trainerId) {
        List<User> trainees = userService.getTraineesByTrainerId(trainerId);
        if (trainees != null) {
            return ResponseEntity.ok(trainees);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if no trainees found or trainer not found
        }
    }
}
