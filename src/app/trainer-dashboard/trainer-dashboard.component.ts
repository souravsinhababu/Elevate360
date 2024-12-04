import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../environment'; // Assuming the environment file contains the API URL

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {
  userId: number | null = null;
  trainees: any[] = [];  // Array to store trainees
  isLoading: boolean = true;  // To show a loading indicator

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve the user ID from AuthService (which fetches it from localStorage)
    this.userId = this.authService.getUserId();

    if (this.userId) {
      // Fetch trainees assigned to the trainer
      this.fetchTrainees(this.userId);
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
    this.authService.logout();  // Logout the user
  }
}
