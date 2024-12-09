package com.elevate360.project.service.assigncourse;

import com.elevate360.project.entity.User;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.repo.UserRepository;
import com.elevate360.project.repo.TrainingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseAssignmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainingListRepository trainingListRepository;

    public List<TrainingList> getAllAvailableCourses() {
        return trainingListRepository.findAll();
    }

    public List<User.AssignedCourse> assignCoursesToTrainer(Long trainerId, List<String> selectedCourses, LocalDate startDate, LocalDate endDate) {
        // Step 1: Fetch the trainer from the User table
        User trainer = userRepository.findById(trainerId).orElseThrow(() -> new RuntimeException("Trainer not found"));

        // Step 2: Prepare a list of AssignedCourse objects to add to the trainer
        List<User.AssignedCourse> assignedCourses = new ArrayList<>();
        for (String courseName : selectedCourses) {
            // Check if the course is valid and exists in the available courses
            if (courseExistsInAvailableCourses(courseName)) {
                User.AssignedCourse assignedCourse = new User.AssignedCourse();
                assignedCourse.setCourseName(courseName);
                assignedCourse.setStartDate(startDate);
                assignedCourse.setEndDate(endDate);
                assignedCourses.add(assignedCourse);
            } else {
                throw new RuntimeException("Course " + courseName + " is not available for assignment.");
            }
        }

        // Step 3: Assign the list of AssignedCourse objects to the trainer
        trainer.setAssignedCourses(assignedCourses);

        // Step 4: Save the updated trainer with assigned courses and date ranges
        userRepository.save(trainer);

        return assignedCourses;
    }

    private boolean courseExistsInAvailableCourses(String courseName) {
        // Check if the course exists in any of the TrainingList entities
        List<TrainingList> availableCourses = trainingListRepository.findAll();
        for (TrainingList trainingList : availableCourses) {
            if (trainingList.getCourses().contains(courseName)) {
                return true;
            }
        }
        return false;
    }
}
