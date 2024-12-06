package com.elevate360.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String designation;

    @NotBlank
    private String role;

    private String specialization;

    // Add this field to the User class
    @ManyToOne
    @JoinColumn(name = "trainer_id")  // foreign key to the trainer (another User)
    @JsonProperty("trainer")  // Will serialize the trainer object as part of the response
    private User trainer;

    // Many trainees can be assigned to one trainer (OneToMany)
    @OneToMany(mappedBy = "trainer")
    @JsonIgnore
    private List<User> trainees;

    @ElementCollection
    @CollectionTable(
            name = "assigned_courses",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private List<AssignedCourse> assignedCourses;

    @Embeddable
    public static class AssignedCourse {
        @Column(name = "course_name")
        private String courseName;

        @Column(name = "start_date")
        private LocalDate startDate;

        @Column(name = "end_date")
        private LocalDate endDate;

        // Getter for courseName
        public String getCourseName() {
            return courseName;
        }

        // Setter for courseName
        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }

        // Getter for startDate
        public LocalDate getStartDate() {
            return startDate;
        }

        // Setter for startDate
        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }

        // Getter for endDate
        public LocalDate getEndDate() {
            return endDate;
        }

        // Setter for endDate
        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for username
    public String getUsername() {
        return username;
    }

    // Setter for username
    public void setUsername(String username) {
        this.username = username;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for password
    public String getPassword() {
        return password;
    }

    // Setter for password
    public void setPassword(String password) {
        this.password = password;
    }

    // Getter for designation
    public String getDesignation() {
        return designation;
    }

    // Setter for designation
    public void setDesignation(String designation) {
        this.designation = designation;
    }

    // Getter for role
    public String getRole() {
        return role;
    }

    // Setter for role
    public void setRole(String role) {
        this.role = role;
    }

    // Getter for specialization
    public String getSpecialization() {
        return specialization;
    }

    // Setter for specialization
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    // Getter for trainer
    public User getTrainer() {
        return trainer;
    }

    // Setter for trainer
    public void setTrainer(User trainer) {
        this.trainer = trainer;
    }

    // Getter for trainees
    public List<User> getTrainees() {
        return trainees;
    }

    // Setter for trainees
    public void setTrainees(List<User> trainees) {
        this.trainees = trainees;
    }

    // Getter for assignedCourses
    public List<AssignedCourse> getAssignedCourses() {
        return assignedCourses;
    }

    // Setter for assignedCourses
    public void setAssignedCourses(List<AssignedCourse> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }
}
