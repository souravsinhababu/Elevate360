import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TraineeDashboardComponent } from './trainee-dashboard/trainee-dashboard.component'; 
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path : 'home', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trainee-dashboard', component: TraineeDashboardComponent }, // Trainee route
  { path: 'trainer-dashboard', component: TrainerDashboardComponent }, // Trainer route
  { path: 'admin-dashboard', component: AdminDashboardComponent }, // Admin route
  {  path: '', redirectTo: '/home', pathMatch: 'full' },  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }