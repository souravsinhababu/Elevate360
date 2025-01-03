package com.elevate360.project.entity.exam;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    @ElementCollection
    private List<AnswerOption> options;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<AnswerOption> getOptions() {
        return options;
    }

    public void setOptions(List<AnswerOption> options) {
        this.options = options;
    }
}
