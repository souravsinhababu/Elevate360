package com.elevate360.project.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "training_list")
public class TrainingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "training_category_id", nullable = false)
    private TrainingCategory trainingCategory;

    @ElementCollection
    @CollectionTable(name = "course_list", joinColumns = @JoinColumn(name = "training_list_id"))
    @Column(name = "course_name")
    private List<String> courses;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TrainingCategory getTrainingCategory() {
        return trainingCategory;
    }

    public void setTrainingCategory(TrainingCategory trainingCategory) {
        this.trainingCategory = trainingCategory;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }
}
