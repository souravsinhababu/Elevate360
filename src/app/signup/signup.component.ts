import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  mobile: string = '';
  role: string = '';
  specialization: string = '';  // Only for trainer
  firstName: string = '';  // Only for trainee
  lastName: string = '';   // Only for trainee
  designation: string = '';  // Only for trainee

  // Sign up form submission logic
  onSignUpSubmit() {
    alert('Sign Up Submitted:\n' + 
          'Role: ' + this.role + '\n' +
          'Username: ' + this.username + '\n' +
          'Password: ' + this.password + '\n' +
          'Mobile: ' + this.mobile + '\n' +
          'Specialization: ' + this.specialization + '\n' +
          'First Name: ' + this.firstName + '\n' +
          'Last Name: ' + this.lastName + '\n' +
          'Designation: ' + this.designation);
   
  }
    

  // Reset form fields when role changes
  roleChanged() {
    this.specialization = '';
    this.firstName = '';
    this.lastName = '';
    this.designation = '';
  }
}
