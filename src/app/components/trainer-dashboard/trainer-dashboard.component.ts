import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment/environment';
import { AuthGuard } from '../../core/guards/auth.guard';
@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {
  userId: number | null = null;
  trainees: any[] = [];  // Array to store trainees
  isLoading: boolean = true;  // To show a loading indicator
  public trainername:string='';

  constructor(private authGuard: AuthGuard, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve the user ID from AuthService (which fetches it from localStorage)
    this.userId = this.authGuard.getUserId();

    if (this.userId) {
      // Fetch trainees assigned to the trainer
      this.fetchTrainees(this.userId);
    }
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.trainername = storedUsername;  // Set the adminname from localStorage
    }
  }

  // Method to fetch trainees assigned to the trainer
  fetchTrainees(trainerId: number): void {
    const url = `${environment.apiUrl}/trainer/${trainerId}/trainees`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.trainees = data;  // Store trainees data
        this.isLoading = false; // Hide loading indicator
      },
      (error) => {
        console.error('Error fetching trainees:', error);
        this.isLoading = false; // Hide loading indicator even if there's an error
      }
    );
  }

  logout() {
    this.authGuard.logout();  // Logout the user
  }
}
