package com.elevate360.project.controller.exam;

import com.elevate360.project.dto.examvalidator.ExamSubmissionDTO;
import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.entity.exam.validator.ExamResult;
import com.elevate360.project.service.UserService;
import com.elevate360.project.service.exam.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private UserService userService;

    @PostMapping("/create/{trainerId}")
    public ResponseEntity<Exam> createExam(@PathVariable Long trainerId, @RequestBody Exam exam) {
        exam.setTrainerId(trainerId);
        Exam savedExam = examService.createExam(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExam);
    }

    @GetMapping("/trainer/{traineeId}")
    public List<Exam> getExamsForTrainee(@PathVariable Long traineeId) {
        // Assume we get trainerId from User entity based on traineeId
        Long trainerId = getTrainerIdFromTrainee(traineeId);  // You will implement this method
        return examService.getExamsByTrainerId(trainerId);
    }

    private Long getTrainerIdFromTrainee(Long traineeId) {
        // This should query the User table to get the trainerId associated with the traineeId
        // For simplicity, assume it returns the trainerId from the User table
        // You can replace this with actual logic to fetch trainerId from your User repository
        return userService.getTrainerIdFromTrainee(traineeId); // Placeholder logic
    }
    @PostMapping("/submit/{traineeId}")
    public ExamResult submitExam(@PathVariable Long traineeId, @RequestBody ExamSubmissionDTO submissionDTO) {
        return examService.evaluateExam(traineeId, submissionDTO);
    }
}

