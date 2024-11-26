import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment
    
 } from '../environment';
@Injectable({
  providedIn: 'root',
})
export class TrainerService {

  constructor(private http: HttpClient) {}

  getAllTrainers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainers`);
  }

  getAllTrainees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/trainee`);
  }
}
