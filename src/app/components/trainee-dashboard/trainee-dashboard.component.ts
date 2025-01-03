import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';  // Import for error handling

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent implements OnInit {
  public traineename: string = '';
  public isEditing: boolean = false;
  public updatedEmail: string = '';
  public updatedPassword: string = '';
  public showEditTraineeModal = false;
  public showModal: boolean = false; // Controls visibility of the test modal
  editTraineeForm!: FormGroup; // Form to edit trainee details
  public traineeId: number | undefined;
  
  // Exam-related variables
  exams: any[] = [];
  currentExamIndex: number = 0;
  currentQuestionIndex: number = 0;
  selectedAnswers: string[] = [];
  currentExam: any;

  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve trainee name and ID dynamically from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedTraineeId = localStorage.getItem('userId');
  
    if (storedUsername) {
      this.traineename = storedUsername;  // Set the trainee name from localStorage
    }
  
    if (storedTraineeId) {
      this.traineeId = parseInt(storedTraineeId, 10);  // Dynamically retrieve the traineeId
    } else {
      console.error('Trainee ID is not available in localStorage!');
    }
  
    this.editTraineeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.traineeId) {
      this.loadExams(); // Load exams if trainee ID is available
    }
  }

  openTestPopup() {
    this.showModal = true;
  }

  closeTestPopup() {
    this.showModal = false;
  }

  loadExams() {
    if (this.traineeId !== undefined && this.traineeId !== null) {
      this.mainService.getQuestions(this.traineeId).subscribe((data: any[]) => {
        this.exams = data;
        this.currentExam = this.exams[this.currentExamIndex];
        this.displayQuestion();
      });
    } else {
      console.error('Trainee ID is invalid or not found');
    }
  }
  

  displayQuestion() {
    const currentQuestion = this.currentExam?.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      this.selectedAnswers[this.currentQuestionIndex] = ''; // Reset answer for current question
    }
  }

  nextQuestion() {
    const selectedOption = this.getSelectedOption();
    if (selectedOption) {
      this.selectedAnswers[this.currentQuestionIndex] = selectedOption;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.currentExam?.questions.length) {
      this.nextExam();
    } else {
      this.displayQuestion();
    }
  }

  getSelectedOption(): string | null {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    return selectedOption ? (selectedOption as HTMLInputElement).value : null;
  }

  nextExam() {
    this.currentExamIndex++;
    if (this.currentExamIndex >= this.exams.length) {
      this.submitTest();  // If no more exams, submit the test
    } else {
      this.currentExam = this.exams[this.currentExamIndex];
      this.currentQuestionIndex = 0; // Reset question index for the next exam
      this.displayQuestion();
    }
  }

  submitTest() {
    const traineeId = this.traineeId as number; // Type assertion
  
    const testResult = {
      traineeId: traineeId,  // Now it's treated as a number
      answers: this.selectedAnswers
    };
  
    this.mainService.submitTest(testResult).subscribe((response: any) => {
      alert('Test submitted successfully!');
    });
  }
  
  
  openEditTraineeModal(): void {
    this.showEditTraineeModal = true;
  }

  closeEditTraineeModal(): void {
    this.showEditTraineeModal = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.editTraineeForm.get(controlName);
    return !!(control?.invalid && control?.touched);  // Return true if invalid and touched
  }

  onEditTraineeSubmit(): void {
    if (this.editTraineeForm.invalid) {
      return;
    }

    if (!this.traineeId) {
      alert('Trainee ID not found!');
      return;
    }

    const updateRequest = {
      email: this.editTraineeForm.value.email,
      password: this.editTraineeForm.value.password
    };

    this.mainService.editTraineeDetails(this.traineeId, updateRequest).subscribe({
      next: (response) => {
        alert('Trainee details updated successfully!');
        this.closeEditTraineeModal();  // Close the modal after successful update
      },
      error: (error: HttpErrorResponse) => {
        alert('Failed to update trainee details!');
        console.error(error);
      }
    });
  }

  logout() {
    this.authGuard.logout();  // Logout the user
  }
}
