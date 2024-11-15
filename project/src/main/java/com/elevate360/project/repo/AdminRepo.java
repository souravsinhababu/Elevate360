package com.elevate360.project.repo;

import com.elevate360.project.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {
    // We are assuming 'username' as the ID of Admin in the database
}
