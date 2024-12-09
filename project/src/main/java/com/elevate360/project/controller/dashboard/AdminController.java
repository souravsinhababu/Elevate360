package com.elevate360.project.controller.dashboard;

import com.elevate360.project.dto.AssignTraineesRequest;
import com.elevate360.project.dto.CourseAssignmentResponse;
import com.elevate360.project.dto.CourseHistoryDTO;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import com.elevate360.project.service.UserService;
import com.elevate360.project.service.assigncourse.CourseAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseAssignmentService courseAssignmentService;

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

    @GetMapping("/available-courses")
    public ResponseEntity<List<TrainingList>> getAvailableCourses() {
        try {
            List<TrainingList> availableCourses = courseAssignmentService.getAllAvailableCourses();
            return ResponseEntity.ok(availableCourses);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Assigning course to the trainer
    @PostMapping("/assign/{trainerId}")
    public ResponseEntity<Object> assignCoursesToTrainer(
            @PathVariable Long trainerId,
            @RequestBody List<String> selectedCourses,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            // Call the service to assign the selected courses with the date range to the trainer
            List<User.AssignedCourse> assignedCourses = courseAssignmentService.assignCoursesToTrainer(trainerId, selectedCourses, startDate, endDate);

            // Return the list of assigned courses
            return ResponseEntity.ok(assignedCourses);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body("Error assigning courses: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Invalid input or date format. Please use YYYY-MM-DD.");
        }
    }


    // Getting course history
    @GetMapping("/course-history")
    public ResponseEntity<List<CourseHistoryDTO>> getCourseHistories() {
        try {
            List<CourseHistoryDTO> courseHistories = userRepository.findAllCourseHistories();
            return ResponseEntity.ok(courseHistories);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
