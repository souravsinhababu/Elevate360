import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  // Login form submission logic
  onLoginSubmit() {
    alert('Login Submitted: ' + 'Username: ' + this.username + ', Password: ' + this.password);
  }
}