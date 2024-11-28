import { Component } from '@angular/core';
import { AuthService } from '../auth.servie';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();  // Logout the user
  }
}
