import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../core/services/main.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm!: FormGroup;  // Declare FormGroup instance

  constructor(private MainService: MainService) {}

  ngOnInit(): void {
    // Initialize the form group with form controls and validators
    this.signupForm = new FormGroup({
      role: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      specialization: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mobile: new FormControl('')
    });
  }

  // Handling form submission
  onSignUpSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const user = this.signupForm.value;
    this.MainService.signup(user).subscribe(
      response => {
        alert('Sign Up Successful!');
        console.log('Signed up user: ', response);
      },
      error => {
        alert('Sign Up Failed! Please try again.');
        console.error(error);
      }
    );
  }

  // Reset the dynamic fields based on role selection
  onRoleChange(): void {
    const role = this.signupForm.get('role')?.value;
    
    if (role === 'trainer') {
      this.signupForm.get('specialization')?.setValidators(Validators.required);
      this.signupForm.get('designation')?.clearValidators();
    } else if (role === 'trainee') {
      this.signupForm.get('specialization')?.clearValidators();
      this.signupForm.get('designation')?.setValidators(Validators.required);
    } else {
      this.signupForm.get('specialization')?.clearValidators();
      this.signupForm.get('designation')?.clearValidators();
    }
    
    this.signupForm.get('specialization')?.updateValueAndValidity();
    this.signupForm.get('designation')?.updateValueAndValidity();
  }
}
