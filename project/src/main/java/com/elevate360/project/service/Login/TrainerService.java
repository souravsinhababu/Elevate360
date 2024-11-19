package com.elevate360.project.service.Login;

import com.elevate360.project.model.Course.Course;
import com.elevate360.project.model.Trainer;
import com.elevate360.project.repo.TrainerRepo;
import com.elevate360.project.service.Course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepo trainerRepo;

    @Autowired
    private CourseService courseService;

    public void addUser(Trainer trainer) {
        trainerRepo.save(trainer);
    }

    public List<Trainer> showTrainerDetails() {
        return trainerRepo.findAll();
    }

    public String loginTrainer(String email, String password) {
        // Find the trainer by email
        Optional<Trainer> trainerOpt = trainerRepo.findById(email);  // Assuming email is the ID in DB

        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            // Check if the provided password matches
            if (trainer.getTrainerPassword().equals(password)) {

                // Fetch the list of courses associated with the trainer
                List<com.elevate360.project.model.Course.Course> courses = courseService.getCoursesByTrainerEmail(email);

                // Lists to store completed and pending courses by type
                List<String> completedBackendCourses = new ArrayList<>();
                List<String> pendingBackendCourses = new ArrayList<>();
                List<String> completedFrontendCourses = new ArrayList<>();
                List<String> pendingFrontendCourses = new ArrayList<>();

                // Categorize courses by type and status
                for (Course course : courses) {
                    if ("backend".equalsIgnoreCase(course.getCourseType())) {
                        if ("completed".equalsIgnoreCase(course.getCourseStatus())) {
                            completedBackendCourses.add(course.getCourseName());
                        } else {
                            pendingBackendCourses.add(course.getCourseName());
                        }
                    } else if ("frontend".equalsIgnoreCase(course.getCourseType())) {
                        if ("completed".equalsIgnoreCase(course.getCourseStatus())) {
                            completedFrontendCourses.add(course.getCourseName());
                        } else {
                            pendingFrontendCourses.add(course.getCourseName());
                        }
                    }
                }

                // Return the results with the course details
                return "Login successful\n" +
                        "Completed Backend Courses: " + completedBackendCourses + "\n" +
                        "Pending Backend Courses: " + pendingBackendCourses + "\n" +
                        "Completed Frontend Courses: " + completedFrontendCourses + "\n" +
                        "Pending Frontend Courses: " + pendingFrontendCourses;

            } else {
                return "Invalid password";
            }
        } else {
            return "Trainer not found";
        }
    }
}
