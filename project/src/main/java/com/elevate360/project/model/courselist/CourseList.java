package com.elevate360.project.model.courselist;

import java.util.List;

public class CourseList {
    private List<String> relevantCourses;
    private List<String> irrelevantCourses;

    public List<String> getRelevantCourses() {
        return relevantCourses;
    }

    public void setRelevantCourses(List<String> relevantCourses) {
        this.relevantCourses = relevantCourses;
    }

    public List<String> getIrrelevantCourses() {
        return irrelevantCourses;
    }

    public void setIrrelevantCourses(List<String> irrelevantCourses) {
        this.irrelevantCourses = irrelevantCourses;
    }

    @Override
    public String toString() {
        return "CourseList{" +
                "relevantCourses=" + relevantCourses +
                ", irrelevantCourses=" + irrelevantCourses +
                '}';
    }
}