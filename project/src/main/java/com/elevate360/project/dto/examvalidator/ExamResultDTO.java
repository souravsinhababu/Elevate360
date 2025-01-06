package com.elevate360.project.dto.examvalidator;

import com.elevate360.project.entity.exam.Exam;
import com.elevate360.project.entity.exam.Question;
import com.elevate360.project.entity.exam.AnswerOption;
import com.elevate360.project.entity.exam.validator.ExamResult;

import java.util.List;

public class ExamResultDTO {

    private Long examId;
    private Long trainerId;
    private String courseName;
    private List<QuestionDTO> questions;
    private int correctAnswers;
    private int totalQuestions;
    private double scorePercentage;

    // Getters and Setters
    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public double getScorePercentage() {
        return scorePercentage;
    }

    public void setScorePercentage(double scorePercentage) {
        this.scorePercentage = scorePercentage;
    }

    // DTO for Question
    public static class QuestionDTO {

        private Long questionId;
        private String question;
        private List<AnswerOptionDTO> options;

        // Getters and Setters

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public List<AnswerOptionDTO> getOptions() {
            return options;
        }

        public void setOptions(List<AnswerOptionDTO> options) {
            this.options = options;
        }

        // DTO for AnswerOption
        public static class AnswerOptionDTO {

            private String option;
            private boolean isCorrect;

            // Getters and Setters
            public String getOption() {
                return option;
            }

            public void setOption(String option) {
                this.option = option;
            }

            public boolean isCorrect() {
                return isCorrect;
            }

            public void setCorrect(boolean isCorrect) {
                this.isCorrect = isCorrect;
            }
        }
    }

    // Method to populate DTO with Exam and ExamResult data
    public static ExamResultDTO fromExamAndResult(Exam exam, ExamResult examResult) {
        ExamResultDTO dto = new ExamResultDTO();
        dto.setExamId(exam.getId());
        dto.setTrainerId(exam.getTrainerId());
        dto.setCourseName(exam.getCourseName());
        dto.setTotalQuestions(examResult.getTotalQuestions());
        dto.setCorrectAnswers(examResult.getCorrectAnswers());
        dto.setScorePercentage(examResult.getScorePercentage());

        // Map questions and answer options
        List<QuestionDTO> questionDTOs = exam.getQuestions().stream().map(question -> {
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setQuestionId(question.getId()); // Assuming `question.getId()` returns the ID
            questionDTO.setQuestion(question.getQuestion());
            List<QuestionDTO.AnswerOptionDTO> answerOptionDTOs = question.getOptions().stream().map(option -> {
                QuestionDTO.AnswerOptionDTO optionDTO = new QuestionDTO.AnswerOptionDTO();
                optionDTO.setOption(option.getOption());
                optionDTO.setCorrect(option.isCorrect());
                return optionDTO;
            }).toList();
            questionDTO.setOptions(answerOptionDTOs);
            return questionDTO;
        }).toList();


        dto.setQuestions(questionDTOs);

        return dto;
    }

    // New getExam() method
    public Exam getExam() {
        Exam exam = new Exam();
        exam.setId(this.getExamId());
        exam.setTrainerId(this.getTrainerId());
        exam.setCourseName(this.getCourseName());
        exam.setQuestions(this.getQuestions().stream().map(questionDTO -> {
            Question question = new Question();
            question.setQuestion(questionDTO.getQuestion());
            question.setOptions(questionDTO.getOptions().stream().map(optionDTO -> {
                AnswerOption answerOption = new AnswerOption();
                answerOption.setOption(optionDTO.getOption());
                answerOption.setCorrect(optionDTO.isCorrect());
                return answerOption;
            }).toList());
            return question;
        }).toList());

        return exam;
    }
}

