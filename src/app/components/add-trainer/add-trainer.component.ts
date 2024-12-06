import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent {
  @Output() addTrainer = new EventEmitter<any>();
  trainer = {
    username: '',
    email: '',
    password: '',
    specialization: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const trainerData = { ...this.trainer, role: 'trainer' };
    this.http.post(`${environment.apiUrl}/admin/addtrainer`, trainerData).subscribe(
      (response) => {
        console.log('Trainer added successfully', response);
        alert('Trainer added successfully!');
        this.addTrainer.emit(response);  // Emit the new trainer to the parent component
      },
      (error) => {
        console.error('Error adding trainer', error);
        alert('Failed to add trainer.');
      }
    );
  }
}
