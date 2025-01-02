import { Component, OnInit } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  exams: any[] = []; // Holds all the exams fetched from API
  currentExamIndex: number = 0; // Index for navigating exams
  currentQuestionIndex: number = 0; // Index for navigating questions
  selectedAnswers: string[] = []; // Stores selected answers
  currentExam: any; // Stores the current exam data
  traineeId: number | null = null; // Set traineeId as a number or null if not available

  constructor(private mainService: MainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve trainee ID from localStorage and convert to number
    const storedTraineeId = localStorage.getItem('userId');
    if (storedTraineeId) {
      this.traineeId = parseInt(storedTraineeId, 10); // Convert to number
      console.log('Trainee ID:', this.traineeId); // Log to ensure it's correct
    }

    // Ensure traineeId is valid before calling loadExams
    if (this.traineeId) {
      this.loadExams();
    } else {
      console.error('Trainee ID not found or invalid.');
    }
  }

  loadExams() {
    if (this.traineeId !== null) {
      this.mainService.getQuestions(this.traineeId).subscribe((data: any[]) => {
        this.exams = data;
        this.currentExam = this.exams[this.currentExamIndex]; // Load the first exam
        this.displayQuestion();
      });
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
    if (this.traineeId !== null) {
      const testResult = {
        traineeId: this.traineeId,
        answers: this.selectedAnswers
      };

      this.mainService.submitTest(testResult).subscribe((response: any) => {
        alert('Test submitted successfully!');
      });
    } else {
      console.error('Trainee ID is invalid.');
    }
  }
}
