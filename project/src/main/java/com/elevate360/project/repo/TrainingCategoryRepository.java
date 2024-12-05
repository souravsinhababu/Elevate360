package com.elevate360.project.repo;

import com.elevate360.project.entity.TrainingCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainingCategoryRepository extends JpaRepository<TrainingCategory, Long> {
    Optional<TrainingCategory> findByCategoryIgnoreCase(String category);
}
