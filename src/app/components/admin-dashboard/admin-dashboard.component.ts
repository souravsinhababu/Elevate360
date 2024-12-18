import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public trainers: any[] = [];
  public trainees: any[] = [];
  public originalTrainers: any[] = [];  // Store original trainers list
  public originalTrainees: any[] = [];  // Store original trainees list
  public selectedRole: string = 'All';  
  public searchQuery: string = '';
  public selectedTrainer: any;
  public selectedTrainee: any;
  public adminname: string = '';
  public selectedTrainerId: number | null = null;
  public isAssigningTrainer: boolean = false;
  public isEditingTrainee: boolean = false;
  public showAddTrainerModal = false;
  public showAddTraineeModal = false;
  public showEditTraineeModal = false;
  public showEditTrainerModal = false;
  public isAssigningTrainees: boolean = false;
  public isAssigningCourses: boolean = false;  // To manage modal visibility
  public startDate: string = '';  // To bind with the start date input
  public endDate: string = '';  // To bind with the end date input
  public availableCourses: any[] = [];
  public selectedCourses: any = {};  // To track selected courses
  public courseHistory: { [traineeId: number]: { trainerName: string; assignedCourses: any[] } } = {};

  constructor(
    private mainService: MainService,  // Inject the service
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.loadTrainers();
    this.loadTrainees();
    this.loadAvailableCourses();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.adminname = storedUsername;  // Set the adminname from localStorage
    }
  }

  loadTrainers() {
    this.mainService.loadTrainers().subscribe(
      (data) => {
        this.trainers = data;
        this.originalTrainers = [...data]; // Store a copy of the original trainers list
        this.search();  // Apply search immediately after loading
      },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  loadTrainees() {
    this.mainService.loadTrainees().subscribe(
      (data) => {
        this.trainees = data.map(trainee => {
          // Fetch course history for each trainee
          this.loadCourseHistory(trainee.id);  // Fetch course history
          trainee.trainer_name = trainee.trainer ? trainee.trainer.username : 'Not assigned';
          return trainee;
        });
        this.originalTrainees = [...data];
        this.search();
      },
      (error) => {
        console.error('Error fetching trainees:', error);
      }
    );
  }

  loadCourseHistory(traineeId: number) {
    this.mainService.getCourseHistory(traineeId).subscribe(
      (historyData) => {
        console.log('API Response:', historyData);  // Log the full response

        // Find the trainee object to extract the trainer's name
        const trainee = this.trainees.find(t => t.id === traineeId);  // Find the trainee by ID
        const trainerName = trainee ? trainee.trainer_name : '';  // Get trainerName from the trainee object

        // Find the trainer's course history from the API response
        const traineeHistory = historyData.find(
          (trainer) => trainer.trainerName === trainerName
        );

        console.log('Trainee History:', traineeHistory);  // Log the matched trainee history

        // If a trainer is found, store their assigned courses along with trainerName, otherwise assign an empty array
        this.courseHistory[traineeId] = traineeHistory ? {
          trainerName: trainerName,
          assignedCourses: traineeHistory.assignedCourses
        } : { trainerName: '', assignedCourses: [] };

        console.log('Assigned Courses:', this.courseHistory[traineeId]);  // Log the assigned courses
      },
      (error) => {
        console.error('Error loading course history', error);
      }
    );
  }

  search() {
    const searchLower = this.searchQuery.toLowerCase();

    if (this.selectedRole === 'Trainer' || this.selectedRole === 'All') {
      this.trainers = this.originalTrainers.filter(trainer =>
        trainer.username.toLowerCase().includes(searchLower) ||
        trainer.email.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedRole === 'Trainee' || this.selectedRole === 'All') {
      this.trainees = this.originalTrainees.filter(trainee =>
        trainee.username.toLowerCase().includes(searchLower) ||
        trainee.email.toLowerCase().includes(searchLower)
      );
    }
  }

  filterByRole() {
    if (this.selectedRole === 'Trainer') {
      this.trainers = this.originalTrainers;
    } else if (this.selectedRole === 'Trainee') {
      this.trainees = this.originalTrainees;
    } else {
      this.trainers = this.originalTrainers;
      this.trainees = this.originalTrainees;
    }

    this.search();  // Reapply search after filtering
  }

  loadAvailableCourses() {
    this.mainService.getAvailableCourses().subscribe(
      (data) => {
        this.availableCourses = data;
      },
      (error) => {
        console.error('Error fetching available courses:', error);
      }
    );
  }

  assignTrainerToTrainee() {
    if (this.selectedTrainee && this.selectedTrainerId) {
      this.mainService.assignTrainerToTrainee(this.selectedTrainee.id, this.selectedTrainerId).subscribe(
        (data) => {
          const assignedTrainee = this.trainees.find(t => t.id === this.selectedTrainee.id);
          if (assignedTrainee) {
            assignedTrainee.trainer_id = this.selectedTrainerId;
            assignedTrainee.trainer_name = this.trainers.find(t => t.id === this.selectedTrainerId)?.username || 'Not assigned';
          }

          this.isAssigningTrainer = false;
          this.selectedTrainee = null;
          this.selectedTrainerId = null;
        },
        (error) => {
          console.error('Error assigning trainer:', error);
        }
      );
    }
  }

  openAssignTraineesModal(trainer: any) {
    if (trainer) {
      this.selectedTrainer = trainer;
      this.isAssigningTrainees = true;
      this.isAssigningCourses = false;
      this.isEditingTrainee = false;
    } else {
      console.error('Invalid trainer passed to the modal');
    }
  }

  cancelAssign() {
    this.isAssigningTrainer = false;
    this.selectedTrainee = null;
    this.selectedTrainerId = null;
  }

  assignTrainer(trainee: any) {
    this.selectedTrainee = trainee;
    this.isAssigningTrainer = true;
    this.isEditingTrainee = false;
  }

  openAddTrainerModal() {
    console.log("Hello");
    this.showAddTrainerModal = true;
  }

  closeAddTrainerModal() {
    this.showAddTrainerModal = false;
  }

  openAddTraineeModal() {
    this.showAddTraineeModal = true;
  }

  closeAddTraineeModal() {
    this.showAddTraineeModal = false;
  }

  closeEditTrainerModal() {
    this.selectedTrainer = null;
    this.showEditTrainerModal = false;
    this.isAssigningCourses = false;
    this.isAssigningTrainees = false;
  }

  closeEditTraineeModal() {
    this.showEditTraineeModal = false;
    this.selectedTrainee = null;
  }

  handleAddedTrainer(trainer: any) {
    this.trainers.push(trainer);
    this.closeAddTrainerModal();
  }

  handleAddedTrainee(trainee: any) {
    this.trainees.push(trainee);
    this.closeAddTraineeModal();
  }

  editTrainer(trainer: any) {
    this.selectedTrainer = { ...trainer };
    this.showEditTrainerModal = true;
  
  }

  deleteTrainer(trainerId: number) {
    this.mainService.deleteTrainer(trainerId).subscribe(
      () => {
        this.trainers = this.trainers.filter(trainer => trainer.id !== trainerId);
      },
      (error) => {
        alert("Trainer is already assigned to Trainee");
      }
    );
  }

  assignTraineesToTrainer() {
    const selectedTrainees = this.trainees.filter(trainee => trainee.selected);

    selectedTrainees.forEach(trainee => {
      if (this.selectedTrainer && this.selectedTrainer.username) {
        this.mainService.assignTraineesToTrainer(trainee.id, this.selectedTrainer.id).subscribe(
          () => {
            trainee.trainer_name = this.selectedTrainer.username;
            trainee.selected = false;
          },
          (error) => {
            console.error('Error assigning trainee:', error);
          }
        );
      } else {
        console.error('Selected trainer is invalid or null');
      }
    });

    this.isAssigningTrainees = false;
    this.selectedTrainer = null;
  }

  cancelAssignTrainees() {
    this.isAssigningTrainees = false;
    this.selectedTrainer = null;
  }

  editTrainee(trainee: any) {
    this.selectedTrainee = trainee;
    this.showEditTraineeModal = true;
    this.isEditingTrainee = true;
    this.isAssigningTrainer = false;
  }

  deleteTrainee(traineeId: number) {
    this.mainService.deleteTrainee(traineeId).subscribe(
      () => {
        this.trainees = this.trainees.filter(trainee => trainee.id !== traineeId);
      },
      (error) => {
        alert("Can't delete trainee because he is in training");
      }
    );
  }

  handleUpdatedTrainee(updatedTrainee: any) {
    const index = this.trainees.findIndex(t => t.id === updatedTrainee.id);
    if (index !== -1) {
      this.trainees[index] = updatedTrainee;
    }

    this.closeEditTraineeModal();
  }

  updateTrainerInDashboard(updatedTrainer: any) {
    const index = this.trainers.findIndex(t => t.id === updatedTrainer.id);
    if (index !== -1) {
      this.trainers[index] = updatedTrainer;
    }
    this.showEditTrainerModal = false;
  }

  openAssignCoursesModal(trainer: any) {
    this.selectedTrainer = trainer;
    this.isAssigningCourses = true;
    this.isAssigningTrainees = false;
    this.isEditingTrainee = false;
    this.selectedCourses = {};
  }

  cancelAssignCourses() {
    this.isAssigningCourses = false;
    this.startDate = '';
    this.endDate = '';
    this.isAssigningTrainees = false;
    this.isEditingTrainee = false;
    this.selectedTrainer = null;
  }

  assignCoursesToTrainer() {
    const selectedCourseNames = Object.keys(this.selectedCourses).filter(course => this.selectedCourses[course]);

    if (this.selectedTrainer && this.startDate && this.endDate && selectedCourseNames.length) {
      this.mainService.assignCoursesToTrainer(
        this.selectedTrainer.id,
        selectedCourseNames,
        this.startDate,
        this.endDate
      ).subscribe(
        () => {
          alert('Courses assigned successfully');
          this.isAssigningCourses = false;
        },
        (error) => {
          console.error('Error assigning courses:', error);
        }
      );
    } else {
      console.error('Please select a trainer, start date, end date, and at least one course.');
    }

    this.isAssigningCourses = false;
    this.selectedTrainer = null;
    this.startDate = '';
    this.endDate = '';
  }

  logout() {
    this.authGuard.logout();  // Logout the user
  }

  openEditTrainerModal(trainer: any) {
    this.selectedTrainer = trainer;
    this.showEditTrainerModal = true;
  }
}
