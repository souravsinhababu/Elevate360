import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent {
  @Input() trainer: any;  // The trainer data passed from parent component
  @Output() updateTrainer = new EventEmitter<any>();  // Event emitter to send data back

  constructor(private http: HttpClient) {}

  saveTrainer() {
    this.http.put<any>(`${environment.apiUrl}/admin/trainers/${this.trainer.id}`, this.trainer)
      .subscribe(
        (data) => {
          this.updateTrainer.emit(data);  // Emit updated trainer back to parent
          alert('Trainer updated successfully');
          
        },
        (error) => {
          console.error('Error updating trainer:', error);
        }
      );
  }
}
