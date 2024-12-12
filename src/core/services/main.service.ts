import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { TraineeCoursesResponse } from '../../app/components/admin-dashboard/course-history.model';

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

  // Assign Trainer to Trainee
  assignTrainerToTrainee(traineeId: number, trainerId: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainees/${traineeId}/assign/${trainerId}`, {});
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

getCourseHistory(traineeId: number): Observable<TraineeCoursesResponse[]> {
  return this.http.get<TraineeCoursesResponse[]>(`${environment.apiUrl}/admin/trainee/${traineeId}`);
}

  

  // Login method for handling login API call
  login(loginData: { email: string, password: string }): Observable<any> {
    const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;
    return this.http.post<any>(loginUrl, {});
  }

  // Add Trainee method for handling adding a new trainee
  addTrainee(traineeData: { username: string, email: string, password: string, designation: string, role: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/addtrainee`, traineeData);
  }

  // Add Trainer method for handling adding a new trainer
  addTrainer(trainerData: { username: string, email: string, password: string, specialization: string, role: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/addtrainer`, trainerData);
  }

  // Update Trainee method for handling updating an existing trainee
  updateTrainee(traineeId: number, traineeData: { username: string, email: string, password: string, designation: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainees/${traineeId}`, traineeData);
  }

  // Update Trainer method for handling updating an existing trainer
  updateTrainer(trainerId: number, trainerData: { username: string, email: string, password: string, specialization: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/trainers/${trainerId}`, trainerData);
  }
}
