import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  // Login form submission logic
  onLoginSubmit() {
    const loginData = {
      email: this.username,  // Assuming username is the email
      password: this.password
    };

    // Send data as query parameters in the URL for login
    const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;
    this.http.post<any>(loginUrl, {}).subscribe(
      response => {
        const role = response.role;
        if (role === 'trainee') {
          this.router.navigate(['/trainee-dashboard']);
        } else if (role === 'trainer') {
          this.router.navigate(['/trainer-dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Unknown role, please contact the admin.');
        }

        // Call the onLoginSuccess method
      
      },
      error => {
        alert('Login failed: Incorrect credentials');
      }
    );
  }

  // Separate onLoginSuccess method
 
}
