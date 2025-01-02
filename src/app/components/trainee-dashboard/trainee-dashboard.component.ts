import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';  // Import for error handling

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent implements OnInit {
  public traineename: string = '';
  public isEditing: boolean = false;
  public updatedEmail: string = '';
  public updatedPassword: string = '';
  public showEditTraineeModal = false;
  editTraineeForm!: FormGroup; // Form to edit trainee details
  public traineeId: number | undefined;
  showModal: boolean = false; // Controls visibility of the modal


  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve trainee name and ID dynamically from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedTraineeId = localStorage.getItem('userId');  // Ensure 'traineeId' is correctly stored in localStorage
  
    if (storedUsername) {
      this.traineename = storedUsername;  // Set the trainee name from localStorage
    }
  
    if (storedTraineeId) {
      this.traineeId = parseInt(storedTraineeId, 10);  // Dynamically retrieve the traineeId
      console.log('Retrieved Trainee ID:', this.traineeId);  // Log the retrieved traineeId
    } else {
      console.error('Trainee ID is not available in localStorage!');
    }
  
    this.editTraineeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  isInvalid(controlName: string): boolean {
    const control = this.editTraineeForm.get(controlName);
    return !!(control?.invalid && control?.touched);  // Return true if invalid and touched
  }

  openEditTraineeModal(): void {
    this.showEditTraineeModal = true;
  }

  closeEditTraineeModal(): void {
    this.showEditTraineeModal = false;
  }
  // Opens the modal
  openTestPopup() {
    this.showModal = true;
  }

  // Closes the modal
  closeTestPopup() {
    this.showModal = false;
  }

  onEditTraineeSubmit(): void {
    if (this.editTraineeForm.invalid) {
      return;
    }

    if (!this.traineeId) {
      alert('Trainee ID not found!');
      return;
    }

    const updateRequest = {
      email: this.editTraineeForm.value.email,
      password: this.editTraineeForm.value.password
    };

    this.mainService.editTraineeDetails(this.traineeId, updateRequest).subscribe({
      next: (response) => {
        alert('Trainee details updated successfully!');
        this.closeEditTraineeModal();  // Close the modal after successful update
      },
      error: (error: HttpErrorResponse) => {
        alert('Failed to update trainee details!');
        console.error(error);
      }
    });
  }

  logout() {
    this.authGuard.logout();  // Logout the user
  }

  // Function to navigate to the Test page
  takeTest() {
    
    this.router.navigate(['/test']);  // Navigate to the test component
  }
}
