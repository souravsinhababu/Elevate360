package com.elevate360.project.controller.exam;

import com.elevate360.project.dto.examvalidator.ExamResultDTO;
import com.elevate360.project.dto.examvalidator.ExamSubmissionDTO;
import com.elevate360.project.entity.User;
import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.entity.exam.validator.ExamResult;
import com.elevate360.project.repo.exam.validate.ExamResultRepo;
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

    @Autowired
    private ExamResultRepo examResultRepo;

    @PostMapping("/create/{trainerId}")
    public ResponseEntity<Exam> createExam(@PathVariable Long trainerId, @RequestBody ExamResultDTO examResultDTO) {
        examResultDTO.setTrainerId(trainerId);
        Exam savedExam = examService.createExam(examResultDTO.getExam());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExam);
    }

    @GetMapping("/trainer/{traineeId}")
    public List<ExamResultDTO> getExamsForTrainee(@PathVariable Long traineeId) {
        // Assume we get trainerId from User entity based on traineeId
//        Long trainerId = getTrainerIdFromTrainee(traineeId);  // You will implement this method
//        return examService.getExamsByTrainerId(trainerId);

        User trainee = userService.getUserById(traineeId); // Get trainee information
        Long trainerId = trainee.getTrainer().getId();  // Get the trainerId from User

        // Retrieve the exams associated with the trainer
        List<Exam> exams = userService.getExamsByTrainerId(trainerId);  // This will interact with the ExamService

        // Retrieve exam results for the trainee
        List<ExamResult> examResults = examResultRepo.findByTraineeId(traineeId);

        // Map the Exam and ExamResult data to ExamResultDTO
        List<ExamResultDTO> examResultDTOs = exams.stream().map(exam -> {
            // Find the corresponding exam result for the current exam
            ExamResult examResult = examResults.stream()
                    .filter(result -> result.getExamId().equals(exam.getId()))
                    .findFirst()
                    .orElse(null);  // If no result found, return null

            // If examResult is null, set default values for exam result fields (e.g., 0 for correct answers and score)
            if (examResult == null) {
                return ExamResultDTO.fromExamAndResult(exam, new ExamResult()); // Create a default ExamResult with 0 values
            }

            // Map the result to DTO
            return ExamResultDTO.fromExamAndResult(exam, examResult);
        }).toList();

        return examResultDTOs;
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

