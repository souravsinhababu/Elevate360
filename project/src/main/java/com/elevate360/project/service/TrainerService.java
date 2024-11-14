package com.elevate360.project.service;


import com.elevate360.project.model.Trainer;
import com.elevate360.project.repo.TrainerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public String loginTrainer(String email, String password) {
        Optional<Trainer> trainerOpt = trainerRepo.findById(email);  // Assuming email is the ID in DB

        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            if (trainer.getTrainerPassword().equals(password)) {
                return "Login successful";
            } else {
                return "Invalid password";
            }
        } else {
            return "Trainer not found";
        }
    }
}

