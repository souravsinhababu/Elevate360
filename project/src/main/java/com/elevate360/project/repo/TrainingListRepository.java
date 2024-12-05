package com.elevate360.project.repo;


import com.elevate360.project.entity.TrainingCategory;
import com.elevate360.project.entity.TrainingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingListRepository extends JpaRepository<TrainingList, Long> {
    // Query to fetch training lists by training category
    List<TrainingList> findByTrainingCategory(TrainingCategory trainingCategory);
}

