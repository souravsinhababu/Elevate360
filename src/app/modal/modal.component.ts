import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() showModal: boolean = false; // Controls visibility
  @Output() close = new EventEmitter<void>(); // Emit close event

  // Method to close the modal
  closeModal() {
    this.close.emit();
  }
}
