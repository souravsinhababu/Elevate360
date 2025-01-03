package com.elevate360.project.repo.exam.validate;

import com.elevate360.project.entity.exam.validator.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamResultRepo extends JpaRepository<ExamResult, Long> {

    // Custom query method to find results by examId
    List<ExamResult> findByExamId(Long examId);
}
