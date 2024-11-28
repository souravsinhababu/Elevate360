import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TraineeDashboardComponent } from './trainee-dashboard/trainee-dashboard.component'; 
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard'; // Import the guard

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trainee-dashboard', component: TraineeDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: 'trainer-dashboard', component: TrainerDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
