import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { MainService } from '../../../core/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  // Using the '!' operator to assert that this will be initialized

  formFields = [
    {
      label: 'Email:',
      type: 'text',
      id: 'username',
      required: true,
      errormessage: 'Enter a valid email',
      validator: [Validators.required, Validators.email]
    },
    {
      label: 'Password:',
      type: 'password',
      id: 'password',
      required: true,
      errormessage: 'Enter Password',
      validator: [Validators.required, Validators.minLength(1)]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authguard: AuthGuard,  
    private mainService: MainService  // Inject the MainService
  ) {}

  ngOnInit(): void {
    // Initialize the form group dynamically based on the d array
    const controls: { [key: string]: FormControl } = {};  // Define the controls object with an explicit type

    // Populate the controls object based on the `d` array
    this.formFields.forEach(field => {
      controls[field.id] = new FormControl('', field.validator); // Create a new FormControl for each field
    });

    this.loginForm = this.fb.group(controls);  // Create the form group using the dynamically generated controls
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

    this.mainService.login(loginData).subscribe(
      (response) => {
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
      (error) => {
        alert('Login failed: Incorrect credentials');
      }
    );
  }
}
