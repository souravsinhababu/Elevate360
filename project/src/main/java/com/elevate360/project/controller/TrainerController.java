package com.elevate360.project.controller;


import com.elevate360.project.model.Trainer;
import com.elevate360.project.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/addUser")
    public void addTrainerDetail(Trainer trainer){trainerService.addUser(trainer);
    }
}
