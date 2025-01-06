import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/signup`, user);
  }

  // Load Trainers
  loadTrainers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainers`);
  }

  // Load Trainees
  loadTrainees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainee`);
  }

  // Get Trainees by Trainer ID
  getTraineesByTrainer(trainerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/trainer/${trainerId}/trainees`);
  }

  unassignTrainerFromTrainee(traineeId: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainees/${traineeId}/unassignTrainer`, {});
  }
  
  // Delete Trainer
  deleteTrainer(trainerId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/admin/trainers/${trainerId}`);
  }

  // Delete Trainee
  deleteTrainee(traineeId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/admin/trainees/${traineeId}`);
  }

  // Assign Trainees to Trainer
  assignTraineesToTrainer(traineeId: number, trainerId: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainees/${traineeId}/assign/${trainerId}`, {});
  }
  getAvailableCourses() {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/available-courses`);
  }

  // Method to assign courses to the trainer
 
assignCoursesToTrainer(trainerId: number, courses: string[], startDate: string, endDate: string) {
  const url = `${environment.apiUrl}/admin/assign/${trainerId}?startDate=${startDate}&endDate=${endDate}`;
  return this.http.post(url, courses);
}

// getCourseHistory(traineeId: number): Observable<TraineeCoursesResponse[]> {
//   return this.http.get<TraineeCoursesResponse[]>(`${environment.apiUrl}/admin/course-history/${traineeId}`);
// }

  

  // Login method for handling login API call
  login(loginData: { email: string, password: string }): Observable<any> {
    const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;
    return this.http.post<any>(loginUrl, {});
  }
 // Create an exam for a trainer
   // Method to create an exam for a trainer
   createExam(trainerId: number, examData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/exam/create/${trainerId}`, examData);
  }
 // Fetch exams assigned to a trainer based on the trainer ID
 getExamsByTrainer(trainerId: number): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/exam/trainer/${trainerId}`);
}

  // // Add Trainee method for handling adding a new trainee
  // addTrainee(traineeData: { username: string, email: string, password: string, designation: string, role: string }): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/admin/addtrainee`, traineeData);
  // }

  // // Add Trainer method for handling adding a new trainer
  // addTrainer(trainerData: { username: string, email: string, password: string, specialization: string, role: string }): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/admin/addtrainer`, trainerData);
  // }

  // Update Trainee method for handling updating an existing trainee
  updateTrainee(traineeId: number, traineeData: { username: string, email: string, password: string, designation: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainees/${traineeId}`, traineeData);
  }

  // Update Trainer method for handling updating an existing trainer
  updateTrainer(trainerId: number, trainerData: { username: string, email: string, password: string, specialization: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainers/${trainerId}`, trainerData);
  }
  editAdminDetails(adminId: number, updateRequest: { email: string, password: string }): Observable<any> {
    // Send a PUT request to the backend to update admin details
    return this.http.put(`${environment.apiUrl}/admin/edit-admin/${adminId}`, updateRequest);
  }
  sendSignupLink(user: { email: string }): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/admin/send-signup-link`, user);
  }
  editTraineeDetails(traineeId: number, traineeData: { email: string, password: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/edit-trainee/${traineeId}`, traineeData);
  }
 
  editTrainerDetails(trainerId: number, updateRequest: { email: string, password: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/trainer/edit-trainer/${trainerId}`, updateRequest);
  }
  getQuestions(traineeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/exam/trainer/${traineeId}`);
  }
  submitTest(testResult: any): Observable<any> {
    const traineeId = testResult.traineeId;
    const url = `${environment.apiUrl}/exam/submit/${traineeId}`;  // Use traineeId in the URL
  
    // Send the test result (with examId and questionAnswers) to the API
    return this.http.post<any>(url, {
      examId: testResult.examId,  // Add examId in the payload
      questionAnswers: testResult.questionAnswers  // Send questionAnswers
    });
  }
 
}