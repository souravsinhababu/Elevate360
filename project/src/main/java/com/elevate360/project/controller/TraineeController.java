package com.elevate360.project.controller;

import com.elevate360.project.model.Trainee;
import com.elevate360.project.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TraineeController {

    @Autowired
    private TraineeService traineeService;

    // Endpoint to add Trainee
    @PostMapping("/addTrainee")
    public String addTrainee(@RequestBody Trainee trainee) {
        traineeService.addTrainee(trainee);
        return "Trainee added successfully";
    }

    // Endpoint to show all trainees
    @GetMapping("/showTrainee")
    public List<Trainee> showTraineeDetails() {
        return traineeService.showTraineeDetails();
    }

    // Endpoint for Trainee login
    @GetMapping("/loginTrainee")
    public String loginTrainee(@RequestParam String email, @RequestParam String password) {
        return traineeService.loginTrainee(email, password);
    }
}
