package com.elevate360.project.repo;

import com.elevate360.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByRole(String a);
    List<User> findByTrainer(User trainer);
}

