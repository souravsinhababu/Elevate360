package com.elevate360.project.service;


import com.elevate360.project.model.Trainer;
import com.elevate360.project.repo.TrainerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepo trainerRepo;

    public void addUser(Trainer trainer) {
        trainerRepo.save(trainer);
    }

    public List<Trainer> showTrainerDetails() {
        return trainerRepo.findAll();
    }
}
