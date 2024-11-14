import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common'; // CommonModule for Angular directives

@Component({
  selector: 'app-login',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, FormsModule], // Declare necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login submitted:', this.username, this.password);
  }
}
