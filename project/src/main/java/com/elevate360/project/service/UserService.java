package com.elevate360.project.service;

import com.elevate360.project.entity.User;
import com.elevate360.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Remove BCryptPasswordEncoder dependency if not needed
    // @Autowired
    // private BCryptPasswordEncoder passwordEncoder;

    public User signup(User user) {
        // If you still want password encoding, leave it as it is
        // user.setPassword(passwordEncoder.encode(user.getPassword()));

        // If no encoding is needed, just save the password as plain text
        if (user.getRole() == null) {
            user.setRole("TRAINEE");  // default role as trainee
        }

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {  // No encryption check now
            return user;
        }
        return null;  // Invalid credentials
    }
}
