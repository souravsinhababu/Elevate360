export interface Course {
    courseName: string;
    startDate: string;
    endDate: string;
  }
  
  export interface TraineeCoursesResponse {
    trainerName: string;
    assignedCourses: Course[];
  }
  
  export interface CourseHistory {
    [key: number]: TraineeCoursesResponse;
  }
  