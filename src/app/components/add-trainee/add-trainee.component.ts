import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent {
  @Output() addTrainee = new EventEmitter<any>();
  trainee = {
    username: '',
    email: '',
    password: '',
    designation: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const traineeData = { ...this.trainee, role: 'trainee' };
    console.log('Trainee data being submitted:', traineeData); // Log the data to be sent

    this.http.post(`${environment.apiUrl}/admin/addtrainee`, traineeData).subscribe(
      (response) => {
        console.log('Trainee added successfully', response);
        alert('Trainee added successfully!');
        this.addTrainee.emit(response);  // Emit the new trainee to the parent component
      },
      (error) => {
        console.error('Error adding trainee:', error); // Log detailed error
        alert(`Failed to add trainee. Error: ${error.message || 'Unknown error'}`);
      }
    );
  }
}
