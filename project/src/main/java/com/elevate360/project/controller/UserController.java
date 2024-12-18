package com.elevate360.project.controller;

import com.elevate360.project.entity.User;
import com.elevate360.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        // Ensure the user does not already exist by email
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).build(); // 409 Conflict if the user already exists
        }

        // Call the service to save the user
        User savedUser = userService.signup(user);

        // Return the created user in the response body
        return ResponseEntity.status(201).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        return userService.login(email, password);
    }
}
