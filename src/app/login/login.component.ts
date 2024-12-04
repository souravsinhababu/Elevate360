import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  // Login form submission logic
  onLoginSubmit() {
    const loginData = {
      email: this.username,  // Assuming username is the email
      password: this.password
    };

    // Send data as query parameters in the URL for login
    const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;
    
    // Make the HTTP request for login
    this.http.post<any>(loginUrl, {}).subscribe(
      response => {
        const role = response.role;
        const token = response.token;  // Assuming the response includes a token
        const id = response.id;  // Assuming the response includes the user's id

        // Store token, role, and id in localStorage (or AuthService if needed)
        this.authService.login(token, role);  // Store token and role in AuthService
        localStorage.setItem('userId', id.toString());  // Store the user ID in localStorage

        // Navigate to the appropriate dashboard based on the role
        if (role === 'trainee') {
          this.router.navigate(['/trainee-dashboard']);
        } else if (role === 'trainer') {
          this.router.navigate(['/trainer-dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Unknown role, please contact the admin.');
        }
      },
      error => {
        alert('Login failed: Incorrect credentials');
      }
    );
  }
}
