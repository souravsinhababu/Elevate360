// admin.component.ts
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { EditTrainerComponent } from '../edit-trainer/edit-trainer.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public trainers: any[] = [];
  public trainees: any[] = [];
  public selectedRole: string = 'All';  
  public searchQuery: string = '';
  public selectedTrainer: any;
  public selectedTrainee: any;

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
        trainer.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        trainer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.trainees = this.trainees.filter(trainee =>
        trainee.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
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
    this.selectedTrainer = { ...trainer };
  }



  // Handle deleting a trainer
  deleteTrainer(trainerId: number) {
    this.http.delete(`${environment.apiUrl}/admin/trainers/${trainerId}`).subscribe(
      () => {
        this.trainers = this.trainers.filter(trainer => trainer.id !== trainerId);
      },
      (error) => {
        console.error('Error deleting trainer:', error);
      }
    );
  }



  editTrainee(trainee: any) {
    this.selectedTrainee = { ...trainee };
  }

  deleteTrainee(traineeId: number) {
    this.http.delete(`${environment.apiUrl}/admin/trainees/${traineeId}`).subscribe(
      () => {
        this.trainees = this.trainees.filter(trainee => trainee.id !== traineeId);
      },
      (error) => {
        console.error('Error deleting trainer:', error);
      }
    );
  }
  handleUpdatedTrainee(updatedTrainee: any) {
    const index = this.trainees.findIndex(t => t.id === updatedTrainee.id);
    if (index !== -1) {
      this.trainees[index] = updatedTrainee;
    }
    this.selectedTrainee = null; 
  }
 
  updateTrainerInDashboard(updatedTrainer: any) {
    const index = this.trainers.findIndex(t => t.id === updatedTrainer.id);
    if (index !== -1) {
      this.trainers[index] = updatedTrainer;
    }
    this.selectedTrainer = null; 
  }
  
}


