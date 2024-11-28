package com.elevate360.project.controller;

import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.repo.TrainingCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-category")
public class TrainingCategoryController {

    @Autowired
    private TrainingCategoryRepository trainingCategoryRepository;

    // Get all categories
    @GetMapping
    public List<TrainingCategory> getAllCategories() {
        return trainingCategoryRepository.findAll();
    }

    // Get category by ID
    @GetMapping("/{id}")
    public TrainingCategory getCategoryById(@PathVariable Long id) {
        return trainingCategoryRepository.findById(id).orElse(null);
    }

    // Create a new category
    @PostMapping("/add")
    public TrainingCategory createCategory(@RequestBody TrainingCategory trainingCategory) {
        return trainingCategoryRepository.save(trainingCategory);
    }
}
