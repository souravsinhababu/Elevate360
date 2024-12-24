import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../core/services/main.service';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnChanges {
  @Input() trainerData: any;  // For Edit or Add functionality
  @Output() addTrainer = new EventEmitter<any>();  // Emit new trainer data (both for add and update)
 
  trainerForm: FormGroup;  // The form for adding/updating the trainer
  isEditMode = false;  // Flag for checking whether it's edit mode or add mode
 
  formFields = [
    { label: 'Username:', type: 'text', id: 'username', required: true, errormessage: 'Username is required' },
    { label: 'Email:', type: 'email', id: 'email', required: true, errormessage: 'Email is required' }
  ];
 
  // Create Subjects to handle success and error events
  trainerAddedOrUpdated: Subject<any> = new Subject();
  trainerError: Subject<string> = new Subject();
 
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.trainerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['trainer']  // Set default role to 'trainer'
    });
  }
 
  ngOnChanges() {
    if (this.trainerData) {
      // If trainerData is provided (i.e., for editing), patch the form with existing data
      this.trainerForm.patchValue({
        username: this.trainerData.username,
        email: this.trainerData.email,
        role: 'trainer'  // Keep the role fixed as 'trainer'
      });
      this.isEditMode = true;  // Set edit mode to true
    } else {
      this.isEditMode = false;  // Set edit mode to false if no trainerData
    }
  }
 
  onSubmit() {
    const trainerData = { ...this.trainerForm.value };
 
    if (this.isEditMode) {
      // Edit existing trainer
      const trainerId = this.trainerData.id;  // Ensure `id` is available in `trainerData`
     
      this.mainService.updateTrainer(trainerId, trainerData).toPromise()
        .then((response) => {
          console.log('Trainer updated successfully', response);
          alert('Trainer updated successfully!');
          this.trainerAddedOrUpdated.next(response);
          this.addTrainer.emit(response);  // Emit the updated trainer data
          window.location.reload();  // Reload the page
        })
        .catch((error) => {
          console.error('Error updating trainer:', error);
          alert(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
          this.trainerError.next(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
        });
    } else {
      // Add new trainer
      this.mainService.sendSignupLink(trainerData).toPromise()
        .then((response) => {
          console.log('Trainer added successfully', response);
          alert('Trainer added successfully!');
          this.trainerAddedOrUpdated.next(response);
          this.addTrainer.emit(response);  // Emit the newly added trainer data
          window.location.reload();  // Reload the page
        })
        .catch((error) => {
          console.error('Error adding trainer:', error);
          alert(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
          this.trainerError.next(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
        });
    }
  }
}
 
 