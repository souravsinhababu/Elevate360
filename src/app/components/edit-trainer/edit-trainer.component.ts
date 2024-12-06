import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';  // Import FormGroup and FormControl for reactive forms
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {
  @Input() trainer: any;  // Input property to receive trainer data
  @Output() updateTrainer = new EventEmitter<any>();  // Event emitter to send updated data back

  trainerForm!: FormGroup;  // FormGroup instance for the form

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the form with the trainer data
    this.trainerForm = new FormGroup({
      username: new FormControl(this.trainer?.username, [Validators.required]),  // Bind the username field with validation
      email: new FormControl(this.trainer?.email, [Validators.required, Validators.email]),  // Bind email with validation
      password: new FormControl(this.trainer?.password, [Validators.required]),  // Bind password with validation
      specialization: new FormControl(this.trainer?.specialization, [Validators.required])  // Bind specialization with validation
    });
  }

  saveTrainer() {
    if (this.trainerForm.invalid) {
      return;  // If the form is invalid, don't submit
    }

    // Send the updated trainer data to the server
    this.http.put<any>(`${environment.apiUrl}/admin/trainers/${this.trainer.id}`, this.trainerForm.value)
      .subscribe(
        (data) => {
          this.updateTrainer.emit(data);  // Emit updated trainer data back to parent
          alert('Trainer updated successfully');
        },
        (error) => {
          console.error('Error updating trainer:', error);
        }
      );
  }
}
