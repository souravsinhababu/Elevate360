package com.elevate360.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TraineeDTO {
    private String username;
    private String email;
    private String specialization;

    public TraineeDTO(@NotBlank @Size(min = 3, max = 50) String username, @Email @NotBlank String email, String specialization) {
        this.email = email;
        this.specialization = specialization;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
