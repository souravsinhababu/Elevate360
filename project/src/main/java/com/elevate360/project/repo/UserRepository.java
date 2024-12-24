package com.elevate360.project.repo;

import com.elevate360.project.dto.CourseHistoryDTO;
import com.elevate360.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> , CrudRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByRole(String a);
    List<User> findByTrainer(User trainer);
//used to edit the trainer email and password
    Optional<User> findById(Long id);


    @Query("SELECT u FROM User u WHERE u.trainer.id = :trainerId AND u.role = 'trainee'")
    List<User> findTraineesByTrainerId(@Param("trainerId") Long trainerId);

    //get history
    @Query("SELECT new com.elevate360.project.dto.CourseHistoryDTO(a.courseName, u.id, u.username, a.startDate, a.endDate) " +
            "FROM User u JOIN u.assignedCourses a")
    List<CourseHistoryDTO> findAllCourseHistories();

    @Query("SELECT u.assignedCourses FROM User u WHERE u.id = :traineeId")
    List<User.AssignedCourse> findAssignedCoursesByTraineeId(@Param("traineeId") Long traineeId);

//    @Query("SELECT u.assignedCourses FROM User u WHERE u.trainer.id = :trainerId")
//    List<User.AssignedCourse> findAssignedCoursesByTrainerId(@Param("trainerId") Long trainerId);

    @Query("SELECT u.assignedCourses FROM User u WHERE u.id = :trainerId")
    List<User.AssignedCourse> findAssignedCoursesByTrainerId(@Param("trainerId") Long trainerId);



    // Fetch the trainer of a specific trainee
    @Query("SELECT u.trainer FROM User u WHERE u.id = :traineeId")
    User findTrainerByTraineeId(@Param("traineeId") Long traineeId);

    // Fetch the AssignedCourses of trainees who have the given trainerId
//    @Query("SELECT ac FROM AssignedCourse ac WHERE ac.trainer.id = :trainerId")
//    List<User.AssignedCourse> findAssignedCoursesByTrainerId(@Param("trainerId") Long trainerId);


    @Query(value = "SELECT trainer_id FROM user_table WHERE id = :traineeId", nativeQuery = true)
    Long getTrainerIdByTraineeId(@Param("traineeId") Long traineeId);
}

