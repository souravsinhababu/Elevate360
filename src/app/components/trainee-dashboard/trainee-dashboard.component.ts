import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent {
  public traineename:string='';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.traineename = storedUsername;  // Set the adminname from localStorage
    }
  }


  logout() {
    this.authService.logout();  // Logout the user
  }
}
