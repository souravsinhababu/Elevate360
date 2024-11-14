package com.elevate360.project.controller;


import com.elevate360.project.model.Trainer;
import com.elevate360.project.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/addUser")
    public String addTrainerDetail(@RequestBody Trainer trainer){
        System.out.println(trainer.getTrainerEmail());
        trainerService.addUser(trainer);
        return "User added";
    }

    @GetMapping("/showUser")
    public List<Trainer> showTrainerDetails(){
        return trainerService.showTrainerDetails();
    }

    @GetMapping("/login")
    public String loginTrainer(@RequestParam String email, @RequestParam String password) {
        return trainerService.loginTrainer(email, password);
    }
}
