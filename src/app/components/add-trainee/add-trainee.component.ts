import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../core/services/main.service';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent {
  @Input() traineeData: any;  // For Edit or Add functionality
  @Output() addTrainee = new EventEmitter<any>();  // Emit new trainee data
 
  traineeForm: FormGroup;  // The form for adding/updating the trainee
 
  formFields = [
    { label: 'Username:', type: 'text', id: 'username', required: true, errormessage: 'Username is required' },
    { label: 'Email:', type: 'email', id: 'email', required: true, errormessage: 'Email is required' }
  ];
 
  // Create Subjects to handle success and error events
  traineeAddedOrUpdated: Subject<any> = new Subject();
  traineeError: Subject<string> = new Subject();
 
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.traineeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['trainee']  // Set default role to 'trainee'
    });
  }
 
  ngOnChanges() {
    if (this.traineeData) {
      // If the traineeData is provided (i.e., for editing), patch the form with existing data
      this.traineeForm.patchValue({
        username: this.traineeData.username,
        email: this.traineeData.email,
        role: 'trainee'  // Keep the role fixed as 'trainee'
      });
    }
  }
 
  onSubmit() {
    const traineeData = { ...this.traineeForm.value };
 
    if (this.traineeData) {
      // Edit existing trainee
      const traineeId = this.traineeData.id;  // Ensure `id` is available in `traineeData`
     
      this.mainService.updateTrainee(traineeId, traineeData).toPromise()
        .then((response) => {
          // console.log('Trainee updated successfully', response);
          alert('Trainee updated successfully!');
          this.traineeAddedOrUpdated.next(response);
          this.addTrainee.emit(response);
        })
        .catch((error) => {
          // console.error('Error updating trainee:', error);
          alert(`Failed to update trainee. Error: ${error.message || 'Unknown error'}`);
          this.traineeError.next(`Failed to update trainee. Error: ${error.message || 'Unknown error'}`);
        });
    } else {
      // Add new trainee
      this.mainService.sendSignupLink(traineeData).toPromise()
        .then((response) => {
          // console.log('Trainee added successfully', response);
          alert('Trainee added successfully!');
          this.traineeAddedOrUpdated.next(response);
          this.addTrainee.emit(response);
        })
        .catch((error) => {
          // console.error('Error adding trainee:', error);
          alert(`Failed to add trainee. Error: ${error.message || 'Unknown error'}`);
          this.traineeError.next(`Failed to add trainee. Error: ${error.message || 'Unknown error'}`);
        });
    }
  }
}