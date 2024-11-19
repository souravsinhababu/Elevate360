package com.elevate360.project.repo.Course;

import com.elevate360.project.model.Course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepo extends JpaRepository<com.elevate360.project.model.Course.Course, Long> {
    // Custom query method to find courses by trainer's email
    List<Course> findByTrainerEmail(String trainerEmail);
}
