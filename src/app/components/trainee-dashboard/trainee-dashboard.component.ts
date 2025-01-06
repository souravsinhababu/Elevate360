import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.css']
})
export class TraineeDashboardComponent implements OnInit {
  public traineename: string = '';
  public showModal: boolean = false;
  editTraineeForm!: FormGroup;
  public showEditTraineeModal: boolean = false;
  public traineeId: number | undefined;

  // Properties for trainername and courses
  public trainername: string | null = '';
  public courses: { courseName: string, startDate: string, endDate: string }[] = [];


  // Exam-related variables
  exams: any[] = [];
  currentExamIndex: number = 0;
  currentQuestionIndex: number = 0;
  selectedAnswers: string[] = [];
  currentExam: any;

  // Define form fields as an array of objects
  formFields = [
    {
      label: 'Email',
      type: 'email',
      id: 'email',
      required: true,
      placeholder: 'Enter new email',
      errorMessage: 'Please enter a valid email.'
    },
    {
      label: 'Password',
      type: 'password',
      id: 'password',
      required: true,
      placeholder: 'Enter new password',
      errorMessage: 'Password is required and should be at least 6 characters.'
    }
  ];

  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const storedTraineeId = localStorage.getItem('userId');
    
    // Retrieve trainername and courses from localStorage
    const trainername = localStorage.getItem('trainername');
    const courses = localStorage.getItem('courses');

    // Assign the values to class properties
    if (trainername) {
      this.trainername = trainername;
    }

    if (courses) {
      this.courses = JSON.parse(courses); // Parse the courses JSON string into an array
    }
    if (storedUsername) {
      this.traineename = storedUsername;
    }

    if (storedTraineeId) {
      this.traineeId = parseInt(storedTraineeId, 10);
    } else {
      console.error('Trainee ID is not available in localStorage!');
    }

    this.editTraineeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.traineeId) {
      this.loadExams();
    }
  }

  openTestPopup() {
    this.showModal = true;
  }

  closeTestPopup() {
    this.showModal = false;
    this.currentExam = null; // Reset the exam when closing
  }

  loadExams() {
    if (this.traineeId !== undefined && this.traineeId !== null) {
      this.mainService.getQuestions(this.traineeId).subscribe((data: any[]) => {
        this.exams = data;
      });
    } else {
      console.error('Trainee ID is invalid or not found');
    }
  }

  startExam(exam: any) {
    this.currentExam = exam;
    this.currentQuestionIndex = 0;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.currentExam?.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      this.selectedAnswers[this.currentQuestionIndex] = '';
    }
  }

  nextQuestion() {
    const selectedOption = this.getSelectedOption();
    if (selectedOption) {
      this.selectedAnswers[this.currentQuestionIndex] = selectedOption;
    }

    this.currentQuestionIndex++;

    // If we've reached the end of the exam, trigger the test submission
    if (this.currentQuestionIndex >= this.currentExam?.questions.length) {
      this.submitTest();
    } else {
      this.displayQuestion();
    }
  }

  getSelectedOption(): string | null {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    return selectedOption ? (selectedOption as HTMLInputElement).value : null;
  }

  submitTest() {
    const traineeId = this.traineeId as number;

    const testResult = {
      traineeId: traineeId,
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
    return !!(control?.invalid && control?.touched);
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
        this.closeEditTraineeModal();
      },
      error: (error: HttpErrorResponse) => {
        alert('Failed to update trainee details!');
        console.error(error);
      }
    });
  }

  logout() {
    this.authGuard.logout();
  }
}
