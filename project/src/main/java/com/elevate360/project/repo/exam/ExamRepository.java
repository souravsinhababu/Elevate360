package com.elevate360.project.repo.exam;

import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.entity.exam.validator.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByTrainerId(Long trainerId);
}
