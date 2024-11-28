package com.elevate360.project.repo;

import com.elevate360.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByRole(String a);
    List<User> findByTrainer(User trainer);

    @Query("SELECT u FROM User u WHERE u.trainer.id = :trainerId AND u.role = 'trainee'")
    List<User> findTraineesByTrainerId(@Param("trainerId") Long trainerId);
}

