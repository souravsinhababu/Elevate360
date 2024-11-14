package com.elevate360.project.repo;

import com.elevate360.project.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepo extends JpaRepository<Trainer, String> {
}
