import { Component, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent {
  @Output() addTrainee = new EventEmitter<any>();
  
  // Form group initialization
  addTraineeForm: FormGroup;

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
      label: 'Designation:',
       type: 'text',
        id: 'designation',
         required: true,
          errormessage: 'Designation is required'
    }
  ];

  // Initialize form controls in the constructor
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.addTraineeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  onSubmit() {
    const traineeData = { ...this.addTraineeForm.value, role: 'trainee' };
    console.log('Trainee data being submitted:', traineeData);  // Log the data to be sent

    this.mainService.addTrainee(traineeData).subscribe(
      (response) => {
        console.log('Trainee added successfully', response);
        alert('Trainee added successfully!');
        this.addTrainee.emit(response);  // Emit the new trainee to the parent component
      },
      (error) => {
        console.error('Error adding trainee:', error);  // Log detailed error
        alert(`Failed to add trainee. Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
}
