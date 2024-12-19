import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit, OnChanges {
  @Input() trainerData: any; // Used for Edit mode
  @Output() addTrainer = new EventEmitter<any>();  // Emit newly added trainer data
  @Output() updateTrainer = new EventEmitter<any>(); // Emit updated trainer data

  addTrainerForm: FormGroup;  // Form group initialization
  isEditMode = false;  // Flag to toggle between Add and Edit mode

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
    },
    { 
      label: 'Password:',
      type: 'password',
      id: 'password',
      required: true,
      errormessage: 'Password is required'
    },
    { 
      label: 'Specialization:',
      type: 'radio',
      id: 'specialization',
      required: true,
      errormessage: 'Specialization is required',
      options: ['FrontEnd', 'BackEnd']
    }
  ];

  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.addTrainerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // If trainerData is provided, set isEditMode to true and populate the form
    if (this.trainerData) {
      this.isEditMode = true;
      this.addTrainerForm.patchValue({
        username: this.trainerData.username,
        email: this.trainerData.email,
        password: this.trainerData.password,
        specialization: this.trainerData.specialization
      });
    }
  }

  ngOnChanges(): void {
    // Handle changes to trainerData, which is used in both Add and Edit mode
    if (this.trainerData) {
      this.isEditMode = true;
      this.addTrainerForm.patchValue({
        username: this.trainerData.username,
        email: this.trainerData.email,
        password: this.trainerData.password,
        specialization: this.trainerData.specialization
      });
    }
  }

  onSubmit(): void {
    const trainerData = { ...this.addTrainerForm.value, role: 'trainer' };

    if (this.isEditMode) {
      // If in Edit mode, update the existing trainer
      trainerData.id = this.trainerData.id;  // Include trainer ID for updating
      this.mainService.updateTrainer(this.trainerData.id, trainerData).subscribe({
       next: (response) => {
          console.log('Trainer updated successfully', response);
          alert('Trainer updated successfully!');
          this.updateTrainer.emit(response); // Emit the updated trainer data
        },
       error: (error) => {
          console.error('Error updating trainer:', error);
          alert(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
        }
    });
    } else {
      // If in Add mode, add a new trainer
      this.mainService.addTrainer(trainerData).subscribe({
       next: (response) => {
          console.log('Trainer added successfully', response);
          alert('Trainer added successfully!');
          this.addTrainer.emit(response); // Emit the newly added trainer data
        },
       error: (error) => {
          console.error('Error adding trainer:', error);
          alert(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
        }
     } );
    }
  }
}
