package com.elevate360.project.repo;

import com.elevate360.project.entity.TrainerTraineeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainerTraineeAssignmentRepo extends JpaRepository<TrainerTraineeAssignment, Long> {
    List<TrainerTraineeAssignment> findByTrainerId(Long trainerId);
}

