package com.elevate360.project.repo;

import com.elevate360.project.dto.TrainerTraineeAssignmentDto;
import com.elevate360.project.entity.TrainerTraineeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface TrainerTraineeAssignmentRepo extends JpaRepository<TrainerTraineeAssignment, Long> {
//    List<TrainerTraineeAssignment> findByTraineeId(Long traineeId);

//    Perfect code
//    @Query("SELECT t.username, c.courseName " +
//            "FROM TrainerTraineeAssignment ta " +
//            "JOIN ta.trainer t " +
//            "JOIN t.assignedCourses c " +
//            "JOIN ta.trainee tr " +
//            "WHERE tr.id = :traineeId")
//    List<Object[]> findTrainerAndCourses(Long traineeId);

    @Query("SELECT t.username, c.courseName, c.startDate, c.endDate " +
            "FROM TrainerTraineeAssignment ta " +
            "JOIN ta.trainer t " +
            "JOIN t.assignedCourses c " +
            "JOIN ta.trainee tr " +
            "WHERE tr.id = :traineeId")
    List<Object[]> findTrainerAndCourses(Long traineeId);

}


