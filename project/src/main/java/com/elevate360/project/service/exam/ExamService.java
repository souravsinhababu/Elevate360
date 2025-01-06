package com.elevate360.project.service.exam;

import com.elevate360.project.dto.examvalidator.ExamSubmissionDTO;
import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.entity.exam.validator.ExamResult;
import com.elevate360.project.repo.exam.ExamRepository;
import com.elevate360.project.entity.exam.Question;
import com.elevate360.project.entity.exam.AnswerOption;
import com.elevate360.project.repo.exam.validate.ExamResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamResultRepo examResult;

    // Method to create exam (unchanged)
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Method to get exams by trainer id (unchanged)
    public List<Exam> getExamsByTrainerId(Long trainerId) {
        return examRepository.findByTrainerId(trainerId);
    }

    // Method to evaluate the submitted exam
    // Method to evaluate the submitted exam
    public ExamResult evaluateExam(Long traineeId, ExamSubmissionDTO submissionDTO) {
        Exam exam = examRepository.findById(submissionDTO.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        int correctAnswers = 0;
        int totalQuestions = exam.getQuestions().size();

        // Loop through each question to check the submitted answers
        for (ExamSubmissionDTO.QuestionAnswerDTO questionAnswerDTO : submissionDTO.getQuestionAnswers()) {
            // Find the question by its ID
            Question question = exam.getQuestions().stream()
                    .filter(q -> q.getId().equals(questionAnswerDTO.getQuestionId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            // Check if the selected answer matches the correct option
            boolean isCorrect = question.getOptions().stream()
                    .anyMatch(option -> option.getOption().equals(questionAnswerDTO.getSelectedOption()) && option.isCorrect());

            // If the selected answer is correct, increment the correct answers count
            if (isCorrect) {
                correctAnswers++;
            }
        }

        // Calculate the score percentage
        double scorePercentage = ((double) correctAnswers / totalQuestions) * 100;

        // Store and return the result
        ExamResult result = new ExamResult();
        result.setTraineeId(traineeId);
        result.setExamId(submissionDTO.getExamId());
        result.setCorrectAnswers(correctAnswers);
        result.setTotalQuestions(totalQuestions);
        result.setScorePercentage(scorePercentage);

        examResult.save(result);
        return result; // Return result to save or process further
    }

}
