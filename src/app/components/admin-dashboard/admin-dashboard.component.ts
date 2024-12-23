import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
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
  hasError: boolean = false;
  public showEditTraineeModal = false;
  public showEditTrainerModal = false;
  public isAssigningTrainees: boolean = false;
  public isAssigningCourses: boolean = false;  // To manage modal visibility
  public startDate: string = '';  // To bind with the start date input
  public endDate: string = '';  // To bind with the end date input
  public availableCourses: any[] = [];
  public selectedCourses: any = {};  // To track selected courses
  public courseHistory: { [traineeId: number]: { trainerName: string; assignedCourses: any[] } } = {};
  public isTrainerVisible: boolean = true;
  public isTraineeVisible: boolean = false;
 
 
  editAdminForm!: FormGroup;  // Form to edit admin details
  showEditAdminModal = false;
  public adminId: number | undefined;
  traineesLoaded: any;
 
  constructor(
    private fb: FormBuilder,
    private mainService: MainService,  // Inject MainService for API calls
    private authGuard: AuthGuard, // Inject AuthGuard for logout
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadTrainers();
    // this.loadTrainees();
    this.loadAvailableCourses();
   
   
    // Retrieve admin name and ID dynamically (example from localStorage)
    const storedUsername = localStorage.getItem('username');
    const storedAdminId = localStorage.getItem('userId');
   
    if (storedUsername) {
      this.adminname = storedUsername;  // Set the adminname from localStorage
    }
    // You can also store the admin ID in localStorage after login
    if (storedAdminId) {
      this.adminId = parseInt(storedAdminId, 10);  // Parse adminId from localStorage
    } else {
      console.error('Admin ID is not available in localStorage!');
    }
 
    this.editAdminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  isInvalid(controlName: string): boolean {
    const control = this.editAdminForm.get(controlName);
    return !!(control?.invalid && control?.touched);  // Return true if invalid and touched
  }
 
  openEditAdminModal(): void {
    this.showEditAdminModal = true;
    console.log('Modal is open:', this.showEditAdminModal);
  }
 
  closeEditAdminModal(): void {
    this.showEditAdminModal = false;
  }
 
  // Handle form submission for editing admin details
  onEditAdminSubmit(): void {
    if (this.editAdminForm.invalid) {
      return; // Don't proceed if form is invalid
    }
 
    if (!this.adminId) {
      alert('Admin ID not found!');
      return;
    }
 
    const updateRequest = {
      email: this.editAdminForm.value.email,
      password: this.editAdminForm.value.password
    };
 
    // Call the API to update admin details using the dynamically fetched adminId
    this.mainService.editAdminDetails(this.adminId, updateRequest).subscribe({
      next:(response) => {
        alert('Admin details updated successfully!');
        this.closeEditAdminModal();  // Close the modal after successful update
      },
     error: (error) => {
        alert('Failed to update admin details!');
        console.error(error);
      }
  });
  }
 
 
 
  loadTrainers() {
    this.mainService.loadTrainers().subscribe({
      next:(data) => {
        this.trainers = data;
        this.originalTrainers = [...data]; // Store a copy of the original trainers list
        this.search();  // Apply search immediately after loading
      },
      error:(error) => {
        console.error('Error fetching trainers:', error);
      }
  });
  }
  loadTrainees(): void {
    this.mainService.loadTrainees().subscribe((response) => {
      // Transform the response data to extract trainee details
      this.trainees = response.map(item => ({
        ...item.trainee,  // Extract the trainee object
        courseHistory: item.assignments || []  // Include the assignments or course history
      }));
  
      console.log('Trainees:', this.trainees); // Debugging output
    });
  }
  
  
  

 
  search() {
    const searchLower = this.searchQuery.toLowerCase();
  
    if (this.selectedRole === 'Trainer' || this.selectedRole === 'All') {
      this.trainers = this.originalTrainers.filter(trainer =>
        trainer?.username?.toLowerCase().includes(searchLower) ||
        trainer?.email?.toLowerCase().includes(searchLower)
      );
    }
  
    if (this.selectedRole === 'Trainee' || this.selectedRole === 'All') {
      this.trainees = this.originalTrainees.filter(trainee =>
        trainee?.username?.toLowerCase().includes(searchLower) ||
        trainee?.email?.toLowerCase().includes(searchLower)
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
    this.mainService.getAvailableCourses().subscribe({
      next:(data) => {
        // console.log("Available Courses Data:", data);  
        this.availableCourses = data;
      },
     error: (error) => {
        console.error('Error fetching available courses:', error);
      }
  });
  }
  showTrainers() {
    this.isTrainerVisible = true;
    this.isTraineeVisible = false;
  }

  showTrainees() {
    this.isTrainerVisible = false;
    this.isTraineeVisible = true;
    
    // Only load trainees if not already 
    if (!this.traineesLoaded) {
      this.loadTrainees();
      this.traineesLoaded = true;  // Set the flag to true after loading
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
 
 
  unassignTrainer(trainee: any) {
    this.selectedTrainee = trainee;
    this.isAssigningTrainer = true;
    this.isEditingTrainee = false;
  }
  
  // New method for unassigning the trainer
  unassignTrainerFromTrainee() {
    if (this.selectedTrainee) {
      this.mainService.unassignTrainerFromTrainee(this.selectedTrainee.id).subscribe({
       next: (response) => {
          // Update the trainee's information after unassigning
          const unassignedTrainee = this.trainees.find(t => t.id === this.selectedTrainee.id);
          if (unassignedTrainee) {
            unassignedTrainee.trainer_name = 'Not assigned'; // Or any other default value
            unassignedTrainee.trainer_id = null;
          }
  
          // Close the modal and reset selection
          this.isAssigningTrainer = false;
          this.selectedTrainee = null;
        },
        error:(error) => {
          console.log(error);
        }
     } );
    }
  }
  
  // Cancel the action
  cancelUnassign() {
    this.isAssigningTrainer = false;
    this.selectedTrainee = null;
  }
  
 
  openAddTrainerModal() {
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
    this.mainService.deleteTrainer(trainerId).subscribe({
      next: () => {
        this.trainers = this.trainers.filter(trainer => trainer.id !== trainerId);
      },
      error: () => {
        alert("Trainer is already assigned to Trainee");
      }
    });
  }
  
 
  assignTraineesToTrainer() {
    const selectedTrainees = this.trainees.filter(trainee => trainee.selected);
 
    selectedTrainees.forEach(trainee => {
      if (this.selectedTrainer && this.selectedTrainer.username) {
        this.mainService.assignTraineesToTrainer(trainee.id, this.selectedTrainer.id).subscribe(
          () => {
            trainee.trainer.username = this.selectedTrainer.username;
            trainee.selected = false;
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
      (resp) => {
        alert("Trainee Deleted Successfully!");
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
      ).subscribe({
       next: () => {
          alert('Courses assigned successfully');
          this.isAssigningCourses = false;
        },
       error: (error) => {
          console.error('Error assigning courses:', error);
        }
    });
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