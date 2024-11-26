import { Component } from '@angular/core';
import { UserService } from '../../user.service';  
import { environment } from '../../environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';  
  mobile: string = '';
  role: string = '';
  specialization: string = '';  
  firstName: string = '';  
  lastName: string = '';   
  designation: string = ''; 

  isRoleSelected: boolean = false;

  constructor(private userService: UserService) {}

  onSignUpSubmit() {
    const user = {
      username: this.username,
      email: this.email,  
      password: this.password,
      role: this.role,
      mobile: this.mobile,
      specialization: this.specialization,
      firstName: this.firstName,
      lastName: this.lastName,
      designation: this.designation
    };

    this.userService.signup(user).subscribe(
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

  roleChanged() {
    this.specialization = '';
    this.firstName = '';
    this.lastName = '';
    this.designation = '';
    this.confirmPassword = '';  

    this.isRoleSelected = this.role ? true : false;
  }
}