import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
 
@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {
  userId: number | null = null;
  trainees: any[] = [];  // Array to store trainees
  isLoading: boolean = true;  // To show a loading indicator
  public trainername: string = '';
  selectedTab: 'ongoing' | 'upcoming' | 'history' = 'ongoing'; // Default tab is ongoing
  uniqueAssignedCourses: any[] = []; // Array to store unique courses

  constructor(private authGuard: AuthGuard, private mainService: MainService) {}

  ngOnInit(): void {
    // Retrieve the user ID from AuthService (which fetches it from localStorage)
    this.userId = this.authGuard.getUserId();

    if (this.userId) {
      // Fetch trainees assigned to the trainer
      this.fetchTrainees(this.userId);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.trainername = storedUsername;  // Set the trainer name from localStorage
    }
  }

  // Method to fetch trainees assigned to the trainer using MainService
  fetchTrainees(trainerId: number): void {
    this.mainService.getTraineesByTrainer(trainerId).subscribe({
      next: (data) => {
        this.trainees = data;  // Store trainees data
        this.isLoading = false; // Hide loading indicator

        // Get unique courses from all trainees
        this.uniqueAssignedCourses = this.getUniqueCourses(data);
      },
      error: (error) => {
        console.error('Error fetching trainees:', error);
        this.isLoading = false; // Hide loading indicator even if there's an error
      }
    });
  }

  // Method to extract unique courses from all trainees
  getUniqueCourses(trainees: any[]): any[] {
    const courses: any[] = [];
    trainees.forEach(trainee => {
      if (trainee.trainer?.assignedCourses) {
        trainee.trainer.assignedCourses.forEach((course: { courseName: any; }) => {
          // Check if the course is already in the list to avoid duplicates
          if (!courses.find(existingCourse => existingCourse.courseName === course.courseName)) {
            courses.push(course);
          }
        });
      }
    });
    return courses;
  }

  // Method to determine if a course is ongoing
  isOngoing(course: any): boolean {
    const currentDate = new Date();
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  }

  // Method to determine if a course is upcoming
  isUpcoming(course: any): boolean {
    const currentDate = new Date();
    const startDate = new Date(course.startDate);
    return currentDate < startDate; // Check if the course start date is in the future
  }
  hasOngoingCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isOngoing(course));
  }

  hasUpcomingCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isUpcoming(course));
  }

  hasCompletedCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isCompleted(course));
  }

  // Method to determine if a course is completed (i.e., endDate is before the current date)
  isCompleted(course: any): boolean {
    const currentDate = new Date();
    const endDate = new Date(course.endDate);
    return currentDate > endDate; // Completed if the end date is in the past
  }

  // Method to handle tab selection
  selectTab(tab: 'ongoing' | 'upcoming' | 'history'): void {
    this.selectedTab = tab;
  }

  logout() {
    this.authGuard.logout();  // Logout the user
  }
}