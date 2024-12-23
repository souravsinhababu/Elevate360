export interface Course {
    courseName: string;
    startDate: string;
    endDate: string;
  }
  
  export interface TraineeCoursesResponse {
    [x: string]: any;
    trainerName: string;
    assignedCourses: Course[];
  }
  
  export interface CourseHistory {
    [key: number]: TraineeCoursesResponse;
  }
  