package com.elevate360.project.entity.exam;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class AnswerOption {

    private String option;

    @Column(name = "is_correct") // Ensure this column name matches your DB schema
    private boolean isCorrect;

    // Getter for option
    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    // Getter and Setter for isCorrect
    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}


