import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }


}
