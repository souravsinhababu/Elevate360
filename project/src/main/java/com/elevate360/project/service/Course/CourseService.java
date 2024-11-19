package com.elevate360.project.service.Course;

import com.elevate360.project.model.Course.Course;
import com.elevate360.project.repo.Course.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepo;

    // Method to fetch courses by trainer email
    public List<com.elevate360.project.model.Course.Course> getCoursesByTrainerEmail(String trainerEmail) {
        return courseRepo.findByTrainerEmail(trainerEmail);
    }
    // Add a new course
    public void addCourse(Course course) {
        courseRepo.save(course);
    }

    // Update the course status (completed/pending)
    public boolean updateCourseStatus(Long courseId, String courseStatus) {
        // Find the course by ID
        Course course = courseRepo.findById(courseId).orElse(null);

        if (course != null) {
            // Set the new status for the course
            course.setCourseStatus(courseStatus);
            courseRepo.save(course);
            return true;
        }
        return false;
    }
}
