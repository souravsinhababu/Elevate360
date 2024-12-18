package com.elevate360.project.controller;

import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.entity.TrainingList;
import com.elevate360.project.repo.TrainingCategoryRepository;
import com.elevate360.project.repo.TrainingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/training-list")
public class TrainingListController {

    @Autowired
    private TrainingListRepository trainingListRepository;

    @Autowired
    private TrainingCategoryRepository trainingCategoryRepository;

    @PostMapping("/add")
    public TrainingList addTrainingList(@RequestBody TrainingList trainingList) {
        // Make sure the TrainingCategory is set before saving the TrainingList
        TrainingCategory category = trainingCategoryRepository.findById(trainingList.getTrainingCategory().getId())
                .orElseThrow(() -> new RuntimeException("Training Category not found"));

        // Set the category object to the training list
        trainingList.setTrainingCategory(category);

        // Save and return the training list
        return trainingListRepository.save(trainingList);
    }
}