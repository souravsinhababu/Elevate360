import { Component, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../core/services/main.service';  // Import MainService

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

  constructor(private mainService: MainService) {}  // Inject MainService

  onSubmit() {
    const trainerData = { ...this.trainer, role: 'trainer' };
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
