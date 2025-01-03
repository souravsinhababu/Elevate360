package com.elevate360.project.dto.examvalidator;

import java.util.List;

public class ExamSubmissionDTO {

    private Long examId;
    private List<QuestionAnswerDTO> questionAnswers;

    // Getter and setter for examId
    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    // Getter and setter for questionAnswers
    public List<QuestionAnswerDTO> getQuestionAnswers() {
        return questionAnswers;
    }

    public void setQuestionAnswers(List<QuestionAnswerDTO> questionAnswers) {
        this.questionAnswers = questionAnswers;
    }

    // Nested DTO for individual question answers
    public static class QuestionAnswerDTO {
        private Long questionId;
        private String selectedOption;

        // Getter and setter for questionId
        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        // Getter and setter for selectedOption
        public String getSelectedOption() {
            return selectedOption;
        }

        public void setSelectedOption(String selectedOption) {
            this.selectedOption = selectedOption;
        }
    }
}
