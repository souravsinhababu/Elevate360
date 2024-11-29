import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { AuthService } from '../auth.servie';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public trainers: any[] = [];
  public trainees: any[] = [];
  public originalTrainers: any[] = [];  // Store original trainers list
  public originalTrainees: any[] = [];  // Store original trainees list
  public selectedRole: string = 'All';  
  public searchQuery: string = '';
  public selectedTrainer: any;
  public selectedTrainee: any;
  public selectedTrainerId: number | null = null;
  public isAssigningTrainer: boolean = false;
  public isEditingTrainee: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTrainers();
    this.loadTrainees();
  }

  loadTrainers() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/trainers`).subscribe(
      (data) => {
        this.trainers = data;
        this.originalTrainers = [...data]; // Store a copy of the original trainers list
        this.search();  // Apply search immediately after loading
      },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  loadTrainees() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/trainee`).subscribe(
      (data) => {
        this.trainees = data.map(trainee => {
          // If trainer is null, assign 'Not assigned' to trainer_id
          trainee.trainer_name = trainee.trainer ? trainee.trainer.username : 'Not assigned';
          return trainee;
        });
        this.originalTrainees = [...data]; // Store a copy of the original trainees list
        this.search();  // Apply search immediately after loading
      },
      (error) => {
        console.error('Error fetching trainees:', error);
      }
    );
  }

  search() {
    const searchLower = this.searchQuery.toLowerCase();

    if (this.selectedRole === 'Trainer' || this.selectedRole === 'All') {
      this.trainers = this.originalTrainers.filter(trainer =>
        trainer.username.toLowerCase().includes(searchLower) ||
        trainer.email.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedRole === 'Trainee' || this.selectedRole === 'All') {
      this.trainees = this.originalTrainees.filter(trainee =>
        trainee.username.toLowerCase().includes(searchLower) ||
        trainee.email.toLowerCase().includes(searchLower)
      );
    }
  }

  filterByRole() {
    if (this.selectedRole === 'Trainer') {
      this.trainers = this.originalTrainers;
    } else if (this.selectedRole === 'Trainee') {
      this.trainees = this.originalTrainees;
    } else {
      this.trainers = this.originalTrainers;
      this.trainees = this.originalTrainees;
    }

    this.search();  // Reapply search after filtering
  }

  assignTrainerToTrainee() {
    if (this.selectedTrainee && this.selectedTrainerId) {
      this.http.put(`${environment.apiUrl}/admin/trainees/${this.selectedTrainee.id}/assign/${this.selectedTrainerId}`, {}).subscribe(
        (data) => {
          // Update the trainer for the selected trainee in the local list
          const assignedTrainee = this.trainees.find(t => t.id === this.selectedTrainee.id);
          if (assignedTrainee) {
            assignedTrainee.trainer_id = this.selectedTrainerId;  // Update trainer ID
            assignedTrainee.trainer_name = this.trainers.find(t => t.id === this.selectedTrainerId)?.username || 'Not assigned'; // Update trainer name
          }
  
          // Close the modal
          this.isAssigningTrainer = false;
          this.selectedTrainee = null;
          this.selectedTrainerId = null;
        },
        (error) => {
          console.error('Error assigning trainer:', error);
        }
      );
    }
  }
  

  cancelAssign() {
    this.isAssigningTrainer = false;
    this.selectedTrainee = null;
    this.selectedTrainerId = null;
  }

  assignTrainer(trainee: any) {
    this.selectedTrainee = trainee;
    this.isAssigningTrainer = true;
    this.isEditingTrainee = false;
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
    this.isEditingTrainee = true;  
    this.isAssigningTrainer = false;
  }

  deleteTrainee(traineeId: number) {
    this.http.delete(`${environment.apiUrl}/admin/trainees/${traineeId}`).subscribe(
      () => {
        this.trainees = this.trainees.filter(trainee => trainee.id !== traineeId);
      },
      (error) => {
        console.error('Error deleting trainee:', error);
      }
    );
  }

  handleUpdatedTrainee(updatedTrainee: any) {
    const index = this.trainees.findIndex(t => t.id === updatedTrainee.id);
    if (index !== -1) {
      this.trainees[index] = updatedTrainee;
    }
    this.selectedTrainee = null;  // Reset selected trainee after update
  }

  updateTrainerInDashboard(updatedTrainer: any) {
    const index = this.trainers.findIndex(t => t.id === updatedTrainer.id);
    if (index !== -1) {
      this.trainers[index] = updatedTrainer;
    }
    this.selectedTrainer = null;  // Reset selected trainer after update
  }

  logout() {
    this.authService.logout();  // Logout the user
  }
}