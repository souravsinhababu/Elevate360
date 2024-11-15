package com.elevate360.project.repo;

import com.elevate360.project.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TraineeRepo extends JpaRepository<Trainee, String> {
}
