package com.elevate360.project.service;


import com.elevate360.project.model.Trainer;
import com.elevate360.project.repo.TrainerRepo;
import org.springframework.stereotype.Service;

@Service
public class TrainerService {

    private TrainerRepo trainerRepo;
    public void addUser(Trainer trainer) {
        trainerRepo.save(trainer);
    }
}
