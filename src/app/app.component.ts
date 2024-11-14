import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common'; // For common directives like ngIf

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone component
  imports: [CommonModule, LoginComponent, SignupComponent], // Import both Login and Signup Components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin = true;
}
