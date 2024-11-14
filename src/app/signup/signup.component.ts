import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common'; // CommonModule for Angular directives

@Component({
  selector: 'app-signup',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, FormsModule], // Declare necessary modules
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  role: string = '';  // The selected role value
  username: string = '';
  password: string = '';
  mobile: string = '';
  firstName: string = '';
  lastName: string = '';
  designation: string = '';
  specialization: string = '';

  // Method triggered when the role changes
  roleChanged() {
    console.log('Role changed to:', this.role);
    // Optionally, add additional logic based on the selected role
    if (this.role === 'trainer') {
      console.log('Specialization required for trainer.');
    }
  }

  onSubmit() {
    console.log('Sign Up submitted with details:', {
      role: this.role,
      username: this.username,
      password: this.password,
      mobile: this.mobile,
      firstName: this.firstName,
      lastName: this.lastName,
      designation: this.designation,
      specialization: this.specialization
    });
  }
}
