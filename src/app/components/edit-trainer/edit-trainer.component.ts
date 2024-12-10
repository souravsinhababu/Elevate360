import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';  // Import FormGroup and FormControl for reactive forms
import { MainService } from '../../core/services/main.service';  // Import MainService

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {
  @Input() trainer: any;  // Input property to receive trainer data
  @Output() updateTrainer = new EventEmitter<any>();  // Event emitter to send updated data back

  trainerForm!: FormGroup;  // FormGroup instance for the form

  // Define the form fields
  formFields = [
    { 
      label: 'Username',
      type: 'text',
      id: 'username',
      required: true,
      errorMessage: 'Username is required' 
    },
    { 
      label: 'Email',
      type: 'email',
      id: 'email',
      required: true,
      errorMessage: 'A valid email is required'
    },
    { 
      label: 'Password',
      type: 'password',
      id: 'password',
      required: true,
      errorMessage: 'Password is required'
    },
    { 
      label: 'Specialization',
      type: 'radio',
      id: 'specialization',
      required: true,
      errorMessage: 'Specialization is required',
      options: ['FrontEnd', 'BackEnd']
    }
  ];

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    // Initialize the form with the trainer data
    this.trainerForm = new FormGroup({
      username: new FormControl(this.trainer?.username, [Validators.required]),
      email: new FormControl(this.trainer?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.trainer?.password, [Validators.required]),
      specialization: new FormControl(this.trainer?.specialization, [Validators.required])
    });
  }

  saveTrainer() {
    if (this.trainerForm.invalid) {
      return;  // If the form is invalid, don't submit
    }

    // Send the updated trainer data to the server using MainService
    this.mainService.updateTrainer(this.trainer.id, this.trainerForm.value).subscribe(
      (data) => {
        this.updateTrainer.emit(data);  // Emit updated trainer data back to parent
        alert('Trainer updated successfully');
      },
      (error) => {
        console.error('Error updating trainer:', error);
        alert(`Failed to update trainer. Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
}
