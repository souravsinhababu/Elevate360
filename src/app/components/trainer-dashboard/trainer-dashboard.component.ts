import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';

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

  constructor(
    private authGuard: AuthGuard,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.userId = this.authGuard.getUserId();

    if (this.userId !== null) {
      this.fetchTrainees(this.userId);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.trainername = storedUsername;  // Set the trainer name from localStorage
    }

    this.loadAvailableCourses();  // Load the available courses for dropdown
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
        // Extracting the courses from the API response
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
    if (!this.selectedCourseName) {  // Check if selectedCourseName is selected
      alert('Please select a course before submitting the quiz.');
      return;
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

    console.log('Exam Data:', examData);

    if (this.userId !== null) {  // Check if userId is not null
      this.mainService.createExam(this.userId, examData).subscribe({
        next: (response) => {
          console.log('Quiz created successfully', response);
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
}
