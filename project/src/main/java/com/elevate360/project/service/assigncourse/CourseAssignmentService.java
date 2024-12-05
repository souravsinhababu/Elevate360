package com.elevate360.project.service.assigncourse;

import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.TrainingCategoryRepository;
import com.elevate360.project.repo.TrainingListRepository;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseAssignmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainingCategoryRepository trainingCategoryRepository;

    @Autowired
    private TrainingListRepository trainingListRepository;

    public void assignCoursesToTrainer(Long trainerId, String startDate, String endDate) {
        // Step 1: Fetch the trainer from the User table
        User trainer = userRepository.findById(trainerId).orElseThrow(() -> new RuntimeException("Trainer not found"));
        String trainerSpecialization = trainer.getSpecialization();

        // Step 2: Fetch the corresponding training category based on the trainer's specialization
        TrainingCategory trainingCategory = trainingCategoryRepository.findByCategoryIgnoreCase(trainerSpecialization)
                .orElseThrow(() -> new RuntimeException("Training category not found for specialization: " + trainerSpecialization));

        // Step 3: Fetch all training lists that belong to this specialization category
        List<TrainingList> trainingLists = trainingListRepository.findByTrainingCategory(trainingCategory);

        // Step 4: Prepare a map of courses and their date ranges to add to the trainer
        Map<String, String> coursesToAssign = new HashMap<>();
        for (TrainingList trainingList : trainingLists) {
            for (String course : trainingList.getCourses()) {
                // Add the course with the specified date range passed from the frontend
                String dateRange = startDate + " to " + endDate;
                coursesToAssign.put(course, dateRange);
            }
        }

        // Step 5: Assign courses and date ranges to the trainer
        trainer.setAssignedCourses(coursesToAssign);

        // Step 6: Save the updated trainer with assigned courses and date ranges
        userRepository.save(trainer);

        // Log the assigned courses with their date ranges
        System.out.println("Courses assigned to trainer " + trainer.getUsername() + ": " + coursesToAssign);
    }
}
