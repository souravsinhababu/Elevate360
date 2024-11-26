// admin.component.ts
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public trainers: any[] = [];
  public trainees: any[] = [];
  public selectedRole: string = 'All';  // Default to show both Trainers and Trainees
  public searchQuery: string = '';

  constructor( private http: HttpClient) {}

  ngOnInit(): void {
    
    this.loadTrainers();
    this.loadTrainees();
  }

  loadTrainers() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/trainers`).subscribe(
      (data) => {
        this.trainers = data;
      },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  loadTrainees() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/trainee`).subscribe(
      (data) => {
        this.trainees = data;
      },
      (error) => {
        console.error('Error fetching trainees:', error);
      }
    );
  }

  search() {
    if (this.searchQuery.trim()) {
      this.trainers = this.trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        trainer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.trainees = this.trainees.filter(trainee =>
        trainee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        trainee.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  filterByRole() {
    if (this.selectedRole === 'Trainer') {
      this.loadTrainers();
    } else if (this.selectedRole === 'Trainee') {
      this.loadTrainees();
    } else {
      this.loadTrainers();
      this.loadTrainees();
    }
  }

  addTrainer() {
    // Navigate to add trainer page or show a modal
  }

  addTrainee() {
    // Navigate to add trainee page or show a modal
  }

  editTrainer(trainer: any) {
    // Handle trainer edit logic
  }

  deleteTrainer(trainerId: number) {
    // Handle trainer delete logic
    console.log('Deleting trainer:', trainerId);
  }

  editTrainee(trainee: any) {
    // Handle trainee edit logic
  }

  deleteTrainee(traineeId: number) {
    // Handle trainee delete logic
    console.log('Deleting trainee:', traineeId);
  }
  
}
