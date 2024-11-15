package com.elevate360.project.service;

import com.elevate360.project.model.Admin;
import com.elevate360.project.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    // Method to add Admin details
    public void addAdmin(Admin admin) {
        adminRepo.save(admin);
    }

    // Method for admin login
    public String loginAdmin(String username, String password) {
        Optional<Admin> adminOpt = adminRepo.findById(username); // Assuming username is the ID in DB

        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                return "Admin login successful";
            } else {
                return "Invalid password";
            }
        } else {
            return "Admin not found";
        }
    }
}
