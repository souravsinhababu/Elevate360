import { Component, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../core/services/main.service';  // Import MainService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent {
  @Output() addTrainer = new EventEmitter<any>();
  
  // Form group initialization
  addTrainerForm: FormGroup;

  // Define the form fields
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

  // Initialize form controls in the constructor
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.addTrainerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }

  onSubmit() {
    const trainerData = { ...this.addTrainerForm.value, role: 'trainer' };
    console.log('Trainer data being submitted:', trainerData);  // Log the data to be sent

    this.mainService.addTrainer(trainerData).subscribe(
      (response) => {
        console.log('Trainer added successfully', response);
        alert('Trainer added successfully!');
        this.addTrainer.emit(response);  // Emit the new trainer to the parent component
      },
      (error) => {
        console.error('Error adding trainer:', error);  // Log detailed error
        alert(`Failed to add trainer. Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
}
