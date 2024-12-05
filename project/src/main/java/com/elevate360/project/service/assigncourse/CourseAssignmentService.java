package com.elevate360.project.service.assigncourse;

import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.TrainingCategoryRepository;
import com.elevate360.project.repo.TrainingListRepository;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void assignCoursesToTrainer(Long trainerId) {
        // Step 1: Fetch the trainer from the User table
        User trainer = userRepository.findById(trainerId).orElseThrow(() -> new RuntimeException("Trainer not found"));
        String trainerSpecialization = trainer.getSpecialization();

        // Step 2: Fetch the corresponding training category based on the trainer's specialization
        TrainingCategory trainingCategory = trainingCategoryRepository.findByCategoryIgnoreCase(trainerSpecialization)
                .orElseThrow(() -> new RuntimeException("Training category not found for specialization: " + trainerSpecialization));

        // Step 3: Fetch all training lists that belong to this specialization category
        List<TrainingList> trainingLists = trainingListRepository.findByTrainingCategory(trainingCategory);

        // Step 4: Assign courses from the relevant training lists to the trainer
        List<String> coursesToAssign = new ArrayList<>();
        for (TrainingList trainingList : trainingLists) {
            // Filter courses from the list based on the trainer's specialization
            for (String course : trainingList.getCourses()) {
                coursesToAssign.add(course);
            }
        }

        // Step 5: Save the assigned courses to the trainer (assuming courses are stored in a list)
        // We could store these courses directly in the User entity or another related entity
        // Here we simply assume courses are being added to some list for the trainer.

        // Assuming you would want to print or log the assigned courses for the trainer
        System.out.println("Courses assigned to trainer " + trainer.getUsername() + ": " + coursesToAssign);

        // Step 6: Save the updated trainer with assigned courses if needed (or just return the courses)
        trainer.setAssignedCourses(coursesToAssign);  // Assuming you add a field for assigned courses in User
        userRepository.save(trainer);
    }
}

