import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import necessary classes for Reactive Forms
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-edit-trainee',
  templateUrl: './edit-trainee.component.html',
  styleUrls: ['./edit-trainee.component.css']
})
export class EditTraineeComponent implements OnInit {
  @Input() trainee: any;  // Input property to receive trainee data
  @Output() updateTrainee = new EventEmitter<any>();  // Event emitter to send updated data back

  traineeForm!: FormGroup;  // FormGroup instance

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the FormGroup and map it to the trainee data
    this.traineeForm = new FormGroup({
      username: new FormControl(this.trainee?.username, [Validators.required]), // Initialize with trainee data
      email: new FormControl(this.trainee?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.trainee?.password, [Validators.required]),
      designation: new FormControl(this.trainee?.designation)  // Optional field, no validation needed
    });
  }

  saveTrainee() {
    if (this.traineeForm.invalid) {
      return;  // If form is invalid, do not submit
    }

    // Send the updated trainee data to the server
    this.http.put<any>(`${environment.apiUrl}/admin/trainees/${this.trainee.id}`, this.traineeForm.value)
      .subscribe(
        (data) => {
          this.updateTrainee.emit(data);  // Emit updated trainee data
          alert('Trainee updated successfully');
        },
        (error) => {
          console.error('Error updating trainee:', error);
        }
      );
  }
}
