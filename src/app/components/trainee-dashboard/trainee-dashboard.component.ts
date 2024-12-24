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
 
  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    // Retrieve trainee name and ID dynamically from localStorage (you may have set this during login)
    const storedUsername = localStorage.getItem('username');
    const storedTraineeId = localStorage.getItem('userId');  // Ensure 'traineeId' is correctly stored in localStorage
 
    if (storedUsername) {
      this.traineename = storedUsername;  // Set the trainee name from localStorage
    }
 
    // Ensure traineeId is set dynamically (no manual id)
    if (storedTraineeId) {
      this.traineeId = parseInt(storedTraineeId, 10);  // Dynamically retrieve the traineeId
    } else {
      console.error('Trainee ID is not available in localStorage!');
    }
 
    // Initialize the form
    this.editTraineeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  // Check if a form control is invalid
  isInvalid(controlName: string): boolean {
    const control = this.editTraineeForm.get(controlName);
    return !!(control?.invalid && control?.touched);  // Return true if invalid and touched
  }
 
  // Open the modal for editing the trainee details
  openEditTraineeModal(): void {
    this.showEditTraineeModal = true;
  }
 
  // Close the modal
  closeEditTraineeModal(): void {
    this.showEditTraineeModal = false;
  }
 
  // Handle form submission for editing trainee details
  onEditTraineeSubmit(): void {
    if (this.editTraineeForm.invalid) {
      return; // Don't proceed if form is invalid
    }
 
    if (!this.traineeId) {
      alert('Trainee ID not found!');
      return;
    }
 
    const updateRequest = {
      email: this.editTraineeForm.value.email,
      password: this.editTraineeForm.value.password
    };
 
    // Call the API to update trainee details using the dynamically fetched traineeId
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
 
  // Logout the user
  logout() {
    this.authGuard.logout();  // Logout the user
  }
}
 
 