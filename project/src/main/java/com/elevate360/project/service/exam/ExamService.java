package com.elevate360.project.service.exam;

import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.repo.exam.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getExamsByTrainerId(Long trainerId) {
        return examRepository.findByTrainerId(trainerId);
    }
}

