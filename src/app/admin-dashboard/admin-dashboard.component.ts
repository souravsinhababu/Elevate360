import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { AuthService } from '../auth.service';  // Adjust the import for your AuthService

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
  public adminname:string='';
  public selectedTrainerId: number | null = null;
  public isAssigningTrainer: boolean = false;
  public isEditingTrainee: boolean = false;
  public showAddTrainerModal = false;
  public showAddTraineeModal = false;
  public isAssigningTrainees: boolean = false;
 


  constructor(private http: HttpClient, private authService: AuthService) {}
 
  ngOnInit(): void {
    this.loadTrainers();
    this.loadTrainees();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.adminname = storedUsername;  // Set the adminname from localStorage
    }
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
          // If trainer is null, assign 'Not assigned' to trainer_name
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
  openAssignTraineesModal(trainer: any) {
    this.selectedTrainer = trainer;
    this.isAssigningTrainees = true;
  }

  cancelAssign() {
    this.isAssigningTrainer = false;
    this.selectedTrainee = null;
    this.selectedTrainerId = null;
  }
 
  assignTrainer(trainee: any) {
    this.selectedTrainee = trainee;
    this.isAssigningTrainer = true;
    this.isEditingTrainee = false;  // Ensure isEditingTrainee is false when assigning trainer
  }

  openAddTrainerModal() {
    this.showAddTrainerModal = true;
  }

  closeAddTrainerModal() {
    this.showAddTrainerModal = false;
  }

  openAddTraineeModal() {
    this.showAddTraineeModal = true;
  }

  closeAddTraineeModal() {
    this.showAddTraineeModal = false;
  }

  // Close edit modals
  closeEditTrainerModal() {
    this.selectedTrainer = null;
  }

  closeEditTraineeModal() {   this.selectedTrainee = null;   this.isEditingTrainee = false; }
 

  handleAddedTrainer(trainer: any) {
    this.trainers.push(trainer);
    this.closeAddTrainerModal();
  }

  handleAddedTrainee(trainee: any) {
    this.trainees.push(trainee);
    this.closeAddTraineeModal();
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
        alert("Can't delete trainer because he is already assigned to a trainee.");
      }
    );
  }
  assignTraineesToTrainer() {
    const selectedTrainees = this.trainees.filter(trainee => trainee.selected);

    selectedTrainees.forEach(trainee => {
      this.http.put(`${environment.apiUrl}/admin/trainees/${trainee.id}/assign/${this.selectedTrainer.id}`, {}).subscribe(
        () => {
          // Update the local list of trainees to reflect their trainer assignment
          trainee.trainer_name = this.selectedTrainer.username;
          trainee.selected = false; // Uncheck the box after assigning
        },
        (error) => {
          console.error('Error assigning trainee:', error);
        }
      );
    });

    this.isAssigningTrainees = false;  // Close the modal
    this.selectedTrainer = null;       // Reset the selected trainer
  }

  cancelAssignTrainees() {
    this.isAssigningTrainees = false;
    this.selectedTrainer = null;
  }


  editTrainee(trainee: any) {
    this.selectedTrainee = { ...trainee };
    this.isEditingTrainee = true;  
    this.isAssigningTrainer = false;  // Ensure the Assign Trainer modal is not opened
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
