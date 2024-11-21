package com.elevate360.project.controller.Login;

import com.elevate360.project.model.Admin;
import com.elevate360.project.model.Course.Course;
import com.elevate360.project.service.Course.CourseService;
import com.elevate360.project.service.Login.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@ResponseBody
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private CourseService courseService;

    // Endpoint to add Admin details
    @PostMapping("/addAdmin")
    public String addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
        return "Admin added successfully";
    }

    // Endpoint to login as Admin
    @GetMapping("/adminLogin")
    public String loginAdmin(@RequestParam  String username, @RequestParam String password) {
        return adminService.loginAdmin(username, password);
    }

    @PostMapping("/addCourse")
    public String addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
        return "Course added successfully!";
    }

    // Endpoint to update the status of a course
    @PutMapping("/updateCourseStatus")
    public String updateCourseStatus(@RequestParam Long courseId, @RequestParam String courseStatus) {
        boolean isUpdated = courseService.updateCourseStatus(courseId, courseStatus);
        if (isUpdated) {
            return "Course status updated successfully!";
        } else {
            return "Course not found!";
        }
    }
}
