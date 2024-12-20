package com.elevate360.project.service.assigncourse;

import com.elevate360.project.dto.TrainerTraineeAssignmentDto;
import com.elevate360.project.entity.TrainerTraineeAssignment;
import com.elevate360.project.repo.TrainerTraineeAssignmentRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TrainerTraineeAssignmentService {
    @Autowired
    private TrainerTraineeAssignmentRepo repository;

    public List<TrainerTraineeAssignment> getAllAssignments() {
        return repository.findAll();  // Fetches all assignments from the database
    }

    // Method to get assignments filtered by traineeId
//    public List<TrainerTraineeAssignment> getAssignmentsByTraineeId(Long traineeId) {
//        return repository.findByTraineeId(traineeId); // Fetch assignments filtered by traineeId
//    }

    public List<Object[]> getAssignmentsByTraineeId(Long traineeId) {
        return repository.findTrainerAndCourses(traineeId);
    }

//    Perfect code
//    public List<TrainerTraineeAssignmentDto> getTrainerAndCourses(Long traineeId) {
//        List<Object[]> result = repository.findTrainerAndCourses(traineeId);
//
//        // Map the result to the DTO format
//        Map<String, List<String>> trainerCoursesMap = new HashMap<>();
//
//        for (Object[] row : result) {
//            String trainerName = (String) row[0];
//            String courseName = (String) row[1];
//
//            trainerCoursesMap.computeIfAbsent(trainerName, k -> new ArrayList<>()).add(courseName);
//        }
//
//        // Convert map to list of DTOs
//        List<TrainerTraineeAssignmentDto> dtoList = new ArrayList<>();
//        for (Map.Entry<String, List<String>> entry : trainerCoursesMap.entrySet()) {
//            dtoList.add(new TrainerTraineeAssignmentDto(entry.getKey(), entry.getValue()));
//        }
//
//        return dtoList;
//    }

    public List<TrainerTraineeAssignmentDto> getTrainerAndCourses(Long traineeId) {
        // Fetch the raw data from the repository (assumes only one call to the repository)
        List<Object[]> result = repository.findTrainerAndCourses(traineeId);

        // A map to hold the grouped data by trainer name
        Map<String, List<TrainerTraineeAssignmentDto.CourseDetailsDto>> trainerCoursesMap = new HashMap<>();

        // Iterate through the result and group the data by trainer name
        for (Object[] row : result) {
            String trainerName = (String) row[0];
            String courseName = (String) row[1];
            LocalDate startDate = (LocalDate) row[2];
            LocalDate endDate = (LocalDate) row[3];

            // Create a CourseDetailsDto object for each course
            TrainerTraineeAssignmentDto.CourseDetailsDto courseDetails = new TrainerTraineeAssignmentDto.CourseDetailsDto(courseName, startDate, endDate);

            // Group courses by trainer name
            trainerCoursesMap.computeIfAbsent(trainerName, k -> new ArrayList<>()).add(courseDetails);
        }

        // Convert the map to the desired DTO format
        List<TrainerTraineeAssignmentDto> resultList = new ArrayList<>();
        for (Map.Entry<String, List<TrainerTraineeAssignmentDto.CourseDetailsDto>> entry : trainerCoursesMap.entrySet()) {
            String trainerName = entry.getKey();
            List<TrainerTraineeAssignmentDto.CourseDetailsDto> courses = entry.getValue();
            resultList.add(new TrainerTraineeAssignmentDto(trainerName, courses));
        }

        // Return the final list, all data is processed in one call
        return resultList;
    }


//    Delete the data from the trainer trainee assignment table

    @Transactional
    public void deleteAssignmentsByTraineeId(Long traineeId) {
        repository.deleteByTraineeId(traineeId);
        System.out.println("Deleted from trainer trainee assigment repo");
    }
}