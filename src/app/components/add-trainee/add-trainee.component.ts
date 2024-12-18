import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../core/services/main.service';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent {
  @Input() traineeData: any;  // For Edit or Add functionality
  @Output() addTrainee = new EventEmitter<any>();  // Emit new trainee data

  // Define the form group (use the correct name here)
  traineeForm: FormGroup;  // Changed the name to 'traineeForm'
  
  formFields = [
    { label: 'Username:', type: 'text', id: 'username', required: true, errormessage: 'Username is required' },
    { label: 'Email:', type: 'email', id: 'email', required: true, errormessage: 'Email is required' },
    { label: 'Designation:', type: 'text', id: 'designation', required: true, errormessage: 'Designation is required' }
  ];

  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.traineeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required]
    });
  }

  ngOnChanges() {
    // If the traineeData is provided (i.e., for editing), patch the form with existing data
    if (this.traineeData) {
      this.traineeForm.patchValue({
        username: this.traineeData.username,
        email: this.traineeData.email,
        designation: this.traineeData.designation
      });
    }
  }

  onSubmit() {
    const traineeData = { ...this.traineeForm.value, role: 'trainee' };

    if (this.traineeData) {
      // Edit existing trainee
      const traineeId = this.traineeData.id;  // Ensure `id` is available in `traineeData`
      this.mainService.updateTrainee(traineeId, traineeData).subscribe(
        (response) => {
          console.log('Trainee updated successfully', response);
          alert('Trainee updated successfully!');
          this.addTrainee.emit(response);  // Emit the updated trainee data
        },
        (error) => {
          console.error('Error updating trainee:', error);
          alert(`Failed to update trainee. Error: ${error.message || 'Unknown error'}`);
        }
      );
    } else {
      // Add new trainee
      this.mainService.addTrainee(traineeData).subscribe(
        (response) => {
          console.log('Trainee added successfully', response);
          alert('Trainee added successfully!');
          this.addTrainee.emit(response);  // Emit the new trainee data
        },
        (error) => {
          console.error('Error adding trainee:', error);
          alert(`Failed to add trainee. Error: ${error.message || 'Unknown error'}`);
        }
      );
    }
  }
}
