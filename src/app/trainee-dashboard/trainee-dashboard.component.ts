import { Component } from '@angular/core';
import { AuthService } from '../auth.servie';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();  // Logout the user
  }
}
