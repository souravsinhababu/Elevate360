import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';  // Ensure the path to environment is correct

@Component({
  selector: 'app-edit-trainee',
  templateUrl: './edit-trainee.component.html',
  styleUrls: ['./edit-trainee.component.css']
})
export class EditTraineeComponent {
  @Input() trainee: any;  // Input property to receive trainee data
  @Output() updateTrainee = new EventEmitter<any>();  // Event emitter to send updated data back

  constructor(private http: HttpClient) {}

  saveTrainee() {
    this.http.put<any>(`${environment.apiUrl}/admin/trainees/${this.trainee.id}`, this.trainee)
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
