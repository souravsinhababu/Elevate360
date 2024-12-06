package com.elevate360.project.service.assigncourse;

import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.TrainingCategoryRepository;
import com.elevate360.project.repo.TrainingListRepository;
import com.elevate360.project.repo.UserRepository;
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
    private TrainingCategoryRepository trainingCategoryRepository;

    @Autowired
    private TrainingListRepository trainingListRepository;

    public void assignCoursesToTrainer(Long trainerId, LocalDate startDate, LocalDate endDate) {
        // Step 1: Fetch the trainer from the User table
        User trainer = userRepository.findById(trainerId).orElseThrow(() -> new RuntimeException("Trainer not found"));
        String trainerSpecialization = trainer.getSpecialization();

        // Step 2: Fetch the corresponding training category based on the trainer's specialization
        TrainingCategory trainingCategory = trainingCategoryRepository.findByCategoryIgnoreCase(trainerSpecialization)
                .orElseThrow(() -> new RuntimeException("Training category not found for specialization: " + trainerSpecialization));

        // Step 3: Fetch all training lists that belong to this specialization category
        List<TrainingList> trainingLists = trainingListRepository.findByTrainingCategory(trainingCategory);

        // Step 4: Prepare a list of AssignedCourse objects to add to the trainer
        List<User.AssignedCourse> assignedCourses = new ArrayList<>();
        for (TrainingList trainingList : trainingLists) {
            for (String course : trainingList.getCourses()) {
                // Create a new AssignedCourse object and set the course, startDate, and endDate
                User.AssignedCourse assignedCourse = new User.AssignedCourse();
                assignedCourse.setCourseName(course);
                assignedCourse.setStartDate(startDate);
                assignedCourse.setEndDate(endDate);

                // Add the AssignedCourse to the list
                assignedCourses.add(assignedCourse);
            }
        }

        // Step 5: Assign the list of AssignedCourse objects to the trainer
        trainer.setAssignedCourses(assignedCourses);

        // Step 6: Save the updated trainer with assigned courses and date ranges
        userRepository.save(trainer);

        // Log the assigned courses with their date ranges
        System.out.println("Courses assigned to trainer " + trainer.getUsername() + ": " + assignedCourses);
    }

    public User getTrainerWithAssignedCourses(Long trainerId) {
        return userRepository.findById(trainerId).orElseThrow(() -> new RuntimeException("Trainer not found"));
    }
}
