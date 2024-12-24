package com.elevate360.project.controller.dashboard;

import com.elevate360.project.dto.EditProfile.TraineeUpdateRequest;
import com.elevate360.project.entity.User;
import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class TraineeController {

    @Autowired
    private UserService userService;

    @GetMapping("/{traineeId}")
    public List<Exam> getTrainerExamsForTrainee(@PathVariable Long traineeId) {
        // Get the trainerId for the given traineeId
        User trainee = userService.getUserById(traineeId); // Get trainee information
        Long trainerId = trainee.getTrainer().getId();  // Get the trainerId from User

        // Retrieve the exams associated with the trainer
        return userService.getExamsByTrainerId(trainerId);  // This will interact with the ExamService
    }
    @PutMapping("/edit-trainee/{id}")
    public ResponseEntity<User> editTraineeEmailAndPassword(
            @PathVariable Long id,
            @RequestBody TraineeUpdateRequest updateRequest) {
        return userService.editTraineeEmailAndPassword(id, updateRequest);
    }

}
