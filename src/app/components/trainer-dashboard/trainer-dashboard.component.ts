import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';  // Import for error handling
 
interface Option {
  option: string;
  isCorrect: boolean;
}
 
@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {
  userId: number | null = null;
  trainees: any[] = [];  // Array to store trainees
  isLoading: boolean = true;  // To show a loading indicator
  public trainername: string = ''; // Trainer name
  selectedTab: 'ongoing' | 'upcoming' | 'history' = 'ongoing'; // Default tab is ongoing
  uniqueAssignedCourses: any[] = []; // Array to store unique courses
  questions: any[] = [];  // Array to store the questions
  selectedCourseName: string = '';  // Variable to store selected course name
 
  availableCourses: string[] = [];  // Array to store available courses from API
  public isEditing: boolean = false;
  public updatedEmail: string = '';
  public updatedPassword: string = '';
  public showEditTrainerModal = false;
  editTrainerForm!: FormGroup;
  public trainerId: number | undefined;
  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.userId = this.authGuard.getUserId();
    this.loadAvailableCourses();
    if (this.userId !== null) {
      this.fetchTrainees(this.userId);
    }
    const storedTrainerId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.trainername = storedUsername;  // Set the trainer name from localStorage
    }
    if (storedTrainerId) {
      this.trainerId = parseInt(storedTrainerId, 10);
      this.fetchTrainees(this.trainerId);
    } else {
      console.error('Trainer ID is not available in localStorage!');
    }
 
    // Initialize the form
    this.editTrainerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  // Check if a form control is invalid
  isInvalid(controlName: string): boolean {
    const control = this.editTrainerForm.get(controlName);
    return !!(control?.invalid && control?.touched);
  }
 
  // Open the modal for editing trainer details
openEditTrainerModal(): void {
  this.showEditTrainerModal = true;
}
 
// Close the modal
closeEditTrainerModal(): void {
  this.showEditTrainerModal = false;
}
 
// Handle form submission for editing trainer details
onEditTrainerSubmit(): void {
  if (this.editTrainerForm.invalid) {
    return;  // Don't proceed if form is invalid
  }
 
  if (!this.trainerId) {
    alert('Trainer ID not found!');
    return;
  }
 
  const updateRequest = {
    email: this.editTrainerForm.value.email,
    password: this.editTrainerForm.value.password
  };
 
  this.mainService.editTrainerDetails(this.trainerId, updateRequest).subscribe({
    next: (response) => {
      alert('Trainer details updated successfully!');
      this.closeEditTrainerModal();  // Close the modal after successful update
    },
    error: (error: HttpErrorResponse) => {
      alert('Failed to update trainer details!');
      // console.error('Error details:', error);  
      if (error.error && error.error.message) {
        console.error('Error Message:', error.error.message);
      }
    }
  });

 
     // Load the available courses for dropdown
  }
 
  fetchTrainees(trainerId: number): void {
    this.mainService.getTraineesByTrainer(trainerId).subscribe({
      next: (data) => {
        this.trainees = data;
        this.isLoading = false;
        this.uniqueAssignedCourses = this.getUniqueCourses(data);
      },
      error: (error) => {
        console.error('Error fetching trainees:', error);
        this.isLoading = false;
      }
    });
  }
 
  loadAvailableCourses(): void {
    this.mainService.getAvailableCourses().subscribe({
      next: (response) => {
        this.availableCourses = response.flatMap(category => category.courses);
      },
      error: (error) => {
        console.error('Error loading available courses:', error);
      }
    });
  }
 
  getUniqueCourses(trainees: any[]): any[] {
    const courses: any[] = [];
    trainees.forEach(trainee => {
      if (trainee.trainer?.assignedCourses) {
        trainee.trainer.assignedCourses.forEach((course: { courseName: any; }) => {
          if (!courses.find(existingCourse => existingCourse.courseName === course.courseName)) {
            courses.push(course);
          }
        });
      }
    });
    return courses;
  }
 
  // Method to handle tab selection
  selectTab(tab: 'ongoing' | 'upcoming' | 'history'): void {
    this.selectedTab = tab;
  }
 
  hasOngoingCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isOngoing(course));
  }
 
  hasUpcomingCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isUpcoming(course));
  }
 
  hasCompletedCourses(): boolean {
    return this.uniqueAssignedCourses.some(course => this.isCompleted(course));
  }
 
  isOngoing(course: any): boolean {
    const today = new Date();
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);
    return startDate <= today && endDate >= today;
  }
 
  isUpcoming(course: any): boolean {
    const today = new Date();
    const startDate = new Date(course.startDate);
    return startDate > today;
  }
 
  isCompleted(course: any): boolean {
    const today = new Date();
    const endDate = new Date(course.endDate);
    return endDate < today;
  }
 
  // Method to mark the correct option for a question
  markCorrectOption(question: any, option: Option): void {
    question.options.forEach((opt: Option) => opt.isCorrect = false);
    option.isCorrect = true;
    question.correctOption = option;
  }
 
  submitQuiz(): void {
    if (!this.selectedCourseName) {
      alert('Please select a course before submitting the quiz.');
      return;
    }
 
    // Check if all questions have at least 2 options and one correct answer
    for (let question of this.questions) {
      if (question.options.filter((opt: { option: string; }) => opt.option.trim() !== '').length < 2) {
        alert('Each question must have at least two options.');
        return;
      }
 
      if (!question.correctOption) {
        alert('Each question must have a correct answer selected.');
        return;
      }
    }
 
    const examData = {
      courseName: this.selectedCourseName,  // Use selectedCourseName as the selected course
      technology: this.selectedCourseName,  // Still passing the same value here for technology
      questions: this.questions.map(q => ({
        question: q.question,
        options: q.options.map((option: { option: any; isCorrect: any; }) => ({
          option: option.option,
          correct: option.isCorrect
        }))
      }))
    };
 
  
 
    if (this.userId !== null) {
      this.mainService.createExam(this.userId, examData).subscribe({
        next: (response) => {
         alert("quiz added");
        },
        error: (error) => {
          console.error('Error creating quiz:', error);
        }
      });
    } else {
      console.error('User ID is null, cannot create quiz');
    }
  }
 
  addQuestion(): void {
    this.questions.push({
      question: '',
      options: [
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
      ],
      correctOption: null
    });
  }
 
  logout() {
    this.authGuard.logout();
  }
 
  hasMinimumTwoOptions(question: any): boolean {
    return question.options.filter((opt: { option: string; }) => opt.option.trim() !== '').length >= 2;
  }
 
  hasCorrectAnswer(question: any): boolean {
    return question.correctOption !== null;
  }
}
 
 