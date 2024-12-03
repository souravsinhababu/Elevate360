package com.elevate360.project.controller.dashboard;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.entity.User;
import com.elevate360.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/trainers")
    public List<User> getAllTrainers() {
        return userService.getAllUsersByRole("trainer");
    }

    @GetMapping("/trainee")
    public List<User> getAllTrainees() {
        return userService.getAllUsersByRole("trainee");
    }

    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        return userService.deleteUserByIdAndRole(id, "trainer");
    }

    @DeleteMapping("/trainees/{id}")
    public ResponseEntity<Void> deleteTrainee(@PathVariable Long id) {
        return userService.deleteUserByIdAndRole(id, "trainee");
    }

    @PutMapping("/trainers/{id}")
    public ResponseEntity<User> updateTrainer(@PathVariable Long id, @RequestBody User updatedTrainer) {
    return userService.updateUserByIdAndRole(id, updatedTrainer, "trainer");
    }

    @PutMapping("/trainees/{id}")
    public ResponseEntity<User> updateTrainee(@PathVariable Long id, @RequestBody User updatedTrainee) {
        return userService.updateUserByIdAndRole(id, updatedTrainee, "trainee");
    }

    @PostMapping("/addtrainer")
    public ResponseEntity<User> addTrainer(@RequestBody User user) {
        user.setRole("trainer");
        return userService.addUser(user);
    }

    @PostMapping("/addtrainee")
    public ResponseEntity<User> addTrainee(@RequestBody User user) {
        user.setRole("trainee");
        return userService.addUser(user);
    }

    @PutMapping("/trainees/{traineeId}/assign/{trainerId}")
    public ResponseEntity<User> assignTraineeToTrainer(@PathVariable Long traineeId, @PathVariable Long trainerId) {
        return userService.assignTraineeToTrainer(traineeId, trainerId);
    }

    @GetMapping("/trainers/{id}/trainees")
    public List<User> getTraineesByTrainer(@PathVariable Long id) {
        return userService.getTraineesByTrainerId(id);
    }
    @PutMapping("/trainers/{trainerId}/assignTrainees")
    public ResponseEntity<String> assignTraineesToTrainer(
            @PathVariable Long trainerId,
            @RequestBody AssignTraineesRequest request) {

        String response = userService.assignTraineesToTrainer(trainerId, request);
        return ResponseEntity.ok(response);
    }
}
