import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { TraineeCoursesResponse } from '../../app/components/admin-dashboard/course-history.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  // Signup method
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

  // Assign Trainer to Trainee (POST with query to simulate PUT)
  assignTrainerToTrainee(traineeId: number, trainerId: number): Observable<any> {
    const url = `${environment.apiUrl}/admin/trainees/${traineeId}/assign/${trainerId}?_method=PUT`;
    return this.http.post(url, {});
  }

  // Delete Trainer
  deleteTrainer(trainerId: number): Observable<any> {
    const url = `${environment.apiUrl}/admin/trainers/${trainerId}?_method=DELETE`;
    return this.http.post(url, {});
  }

  // Delete Trainee
  deleteTrainee(traineeId: number): Observable<any> {
    const url = `${environment.apiUrl}/admin/trainees/${traineeId}?_method=DELETE`;
    return this.http.post(url, {});
  }

  // Assign Trainees to Trainer (POST with query to simulate PUT)
  assignTraineesToTrainer(traineeId: number, trainerId: number): Observable<any> {
    const url = `${environment.apiUrl}/admin/trainees/${traineeId}/assign/${trainerId}?_method=PUT`;
    return this.http.post(url, {});
  }

  // Get Available Courses
  getAvailableCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/available-courses`);
  }

  // Assign Courses to Trainer (Using POST with query parameters)
  assignCoursesToTrainer(trainerId: number, courses: string[], startDate: string, endDate: string): Observable<any> {
    const url = `${environment.apiUrl}/admin/assign/${trainerId}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.post(url, courses);
  }

  // Get Course History
  getCourseHistory(traineeId: number): Observable<TraineeCoursesResponse[]> {
    return this.http.get<TraineeCoursesResponse[]>(`${environment.apiUrl}/admin/trainee/${traineeId}`);
  }

// Login method for handling login API call
login(loginData: { email: string, password: string }): Observable<any> {
  const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;
  return this.http.post<any>(loginUrl, {});
}
  // Add Trainee method (sending data as form data to avoid preflight)
  addTrainee(traineeData: { username: string, email: string, password: string, designation: string, role: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); ///x-www-form-urlencoded -  avoid triggering CORS preflight requests
    const body = new URLSearchParams();
    body.set('username', traineeData.username);
    body.set('email', traineeData.email);
    body.set('password', traineeData.password);
    body.set('designation', traineeData.designation);
    body.set('role', traineeData.role);

    return this.http.post(`${environment.apiUrl}/admin/addtrainee`, body.toString(), { headers });
  }

  // Add Trainer method (sending data as form data to avoid preflight)
  addTrainer(trainerData: { username: string, email: string, password: string, specialization: string, role: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', trainerData.username);
    body.set('email', trainerData.email);
    body.set('password', trainerData.password);
    body.set('specialization', trainerData.specialization);
    body.set('role', trainerData.role);

    return this.http.post(`${environment.apiUrl}/admin/addtrainer`, body.toString(), { headers });
  }

  // Update Trainee method (sending data as form data to avoid preflight)
  updateTrainee(traineeId: number, traineeData: { username: string, email: string, password: string, designation: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', traineeData.username);
    body.set('email', traineeData.email);
    body.set('password', traineeData.password);
    body.set('designation', traineeData.designation);

    return this.http.post(`${environment.apiUrl}/admin/trainees/${traineeId}?_method=PUT`, body.toString(), { headers });
  }

  // Update Trainer method (sending data as form data to avoid preflight)
  updateTrainer(trainerId: number, trainerData: { username: string, email: string, password: string, specialization: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', trainerData.username);
    body.set('email', trainerData.email);
    body.set('password', trainerData.password);
    body.set('specialization', trainerData.specialization);

    return this.http.post(`${environment.apiUrl}/admin/trainers/${trainerId}?_method=PUT`, body.toString(), { headers });
  }
}
