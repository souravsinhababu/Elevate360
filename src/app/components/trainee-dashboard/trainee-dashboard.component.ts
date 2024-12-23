import { Component } from '@angular/core';
import { AuthGuard } from '../../../core/guards/auth.guard';
@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent {
  public traineename:string='';
  constructor(private authGuard: AuthGuard) {}
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.traineename = storedUsername;  // Set the trainer name from localStorage
    }
  }


  logout() {
    this.authGuard.logout();  // Logout the user
  }
}