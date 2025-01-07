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

  correctAnswers: any;
  totalQuestions: any;
  scorePercentage: any;

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
    this.selectedAnswers = new Array(this.currentExam?.questions.length).fill(null);

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

  loadExams() {
    if (this.traineeId !== undefined && this.traineeId !== null) {
      this.mainService.getQuestions(this.traineeId).subscribe((data: any[]) => {
        this.exams = data;
      });
    } else {
      console.error('Trainee ID is invalid or not found');
    }
  }

  startFullScreenTest(exam: any) {
    this.currentExam = exam; // Set the current exam
    this.currentQuestionIndex = 0; // Reset the question index
    
    // Check if the exam already has a score
    if (exam.scorePercentage !== undefined && exam.scorePercentage !== null) {
      // Exam has a score, display the score directly and do not open the question modal
      this.scorePercentage = exam.scorePercentage;
      this.correctAnswers = exam.correctAnswers;
      this.totalQuestions = exam.totalQuestions;
      
      // Hide the question modal since the test is already taken
      this.showModal = false; 
    } else {
      // Exam has no score yet, so show the questions to be answered
      this.selectedAnswers = new Array(exam.questions.length).fill(null); // Reset answers
      this.showModal = true; // Show the question modal to answer questions
      this.displayQuestion(); // Show the first question
    }
  }
  
  // Display current question
  displayQuestion() {
    const currentQuestion = this.currentExam?.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      this.selectedAnswers[this.currentQuestionIndex] = '';
    }
  }

  // Move to the next question
  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.currentExam?.questions.length) {
      this.submitTest();
    } else {
      this.displayQuestion();
    }
  }

  // Submit the test
  submitTest() {
    const traineeId = this.traineeId as number;
    if (!traineeId) {
      alert('Trainee ID is not available.');
      return;
    }

    const examId = this.currentExam?.examId;
    if (!examId) {
      alert('Exam ID is not available.');
      return;
    }

    const questionAnswers = this.selectedAnswers.map((answer, index) => {
      return {
        questionId: this.currentExam?.questions[index]?.questionId,
        selectedOption: answer || ''
      };
    });

    const testResult = {
      examId: examId,
      traineeId: traineeId,
      questionAnswers: questionAnswers
    };

    this.mainService.submitTest(testResult).subscribe((response: any) => {
      alert('Test submitted successfully!');
      this.loadExams(); // Reload exams to update the score
    }, error => {
      alert('There was an error submitting your test.');
      console.error(error);
    });
  }

  // Close the full-screen test
  closeTest() {
    this.currentExam = null; // Reset the current exam
    this.currentQuestionIndex = 0; // Reset the question index
  }

  logout() {
    this.authGuard.logout();
  }
}
