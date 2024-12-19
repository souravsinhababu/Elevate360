import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';  // Import Subject
 
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {
  @Input() trainerData: any; // Used for Edit mode
  @Output() addTrainer = new EventEmitter<any>();  // Emit newly added trainer data
  @Output() updateTrainer = new EventEmitter<any>(); // Emit updated trainer data
 
  addTrainerForm: FormGroup;  // Form group initialization
  isEditMode = false;  // Flag to toggle between Add and Edit mode
 
  // Subjects to handle success and error
  trainerAddedOrUpdated: Subject<any> = new Subject();
  trainerError: Subject<string> = new Subject();
 
  formFields = [
    {
      label: 'Username:',
      type: 'text',
      id: 'username',
      required: true,
      errormessage: 'Username is required'
    },
    {
      label: 'Email:',
      type: 'email',
      id: 'email',
      required: true,
      errormessage: 'Email is required'
    }
  ];
 
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.addTrainerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['trainer']  // Default role is set to 'trainer'
    });
  }
 
  ngOnInit(): void {
    // If trainerData is provided, set isEditMode to true and populate the form
    if (this.trainerData) {
      this.isEditMode = true;
      this.addTrainerForm.patchValue({
        username: this.trainerData.username,
        email: this.trainerData.email,
        role: 'trainer'  // Ensure the role is 'trainer' when editing
      });
    }
  }
 
  onSubmit(): void {
    const trainerData = { ...this.addTrainerForm.value };
 
    if (this.isEditMode) {
      // If in Edit mode, update the existing trainer
      trainerData.id = this.trainerData.id;  // Include trainer ID for updating
 
      // Use toPromise() and handle success/failure with Subject
      this.mainService.updateTrainer(this.trainerData.id, trainerData).toPromise()
        .then((response) => {
          console.log('Trainer updated successfully', response);
          alert('Trainer updated successfully!');
         
          // Emit the updated trainer data
          this.trainerAddedOrUpdated.next(response);
          this.updateTrainer.emit(response); // Emit the updated trainer data
        })
        .catch((error) => {
          console.error('Error updating trainer:', error);
          alert(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
         
          // Emit the error message
          this.trainerError.next(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
        });
    } else {
      // If in Add mode, add a new trainer
 
      // Use toPromise() and handle success/failure with Subject
      this.mainService.sendSignupLink(trainerData).toPromise()
        .then((response) => {
          console.log('Trainer added successfully', response);
          alert('Trainer added successfully!');
         
          // Emit the success response using Subject
          this.trainerAddedOrUpdated.next(response);
 
          // Emit the newly added trainer data
          this.addTrainer.emit(response); // Emit the newly added trainer data
        })
        .catch((error) => {
          console.error('Error adding trainer:', error);
          alert(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
         
          // Emit the error message using Subject
          this.trainerError.next(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
        });
    }
  }
}
 
 