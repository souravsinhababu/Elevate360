// src/app/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // Load Trainers
  loadTrainers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainers`);
  }

  // Load Trainees
  loadTrainees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainee`);
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
}
