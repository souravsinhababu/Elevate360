package com.elevate360.project.controller;
import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200/")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // Get all trainers
    @GetMapping("/trainers")
    public List<User> getAllTrainers() {
        return userRepository.findByRole("trainer");
    }

    // Get all trainees
    @GetMapping("/trainee")
    public List<User> getAllTrainees() {
        return userRepository.findByRole("trainee");
    }
}

