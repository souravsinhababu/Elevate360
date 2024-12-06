import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment/environment';
import { AuthGuard } from '../../core/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;  // Using the '!' operator to assert that this will be initialized

  constructor(
    private router: Router,
    private http: HttpClient,
    private authguard: AuthGuard,  // Lowercase 'authguard' here, matching the injected property
  ) {}

  ngOnInit(): void {
    // Initialize the form group in ngOnInit
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  // Login form submission logic
  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Do not proceed if the form is invalid
    }

    const loginData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    const loginUrl = `${environment.apiUrl}/api/users/login?email=${loginData.email}&password=${loginData.password}`;

    this.http.post<any>(loginUrl, {}).subscribe(
      response => {
        const role = response.role;
        const token = response.token;
        const id = response.id;
        const name = response.username;

        this.authguard.login(token, role);  // Corrected to match 'authguard'
        localStorage.setItem('userId', id.toString());
        localStorage.setItem('username', name.toString());
        localStorage.setItem('authToken', token);

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
