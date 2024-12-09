import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { TraineeDashboardComponent } from '../../components/trainee-dashboard/trainee-dashboard.component'; 
import { TrainerDashboardComponent } from '../../components/trainer-dashboard/trainer-dashboard.component'; 
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component'; 
import { AuthGuard } from '../guards/auth.guard'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trainee-dashboard', component: TraineeDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: 'trainer-dashboard', component: TrainerDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] }, // Protect route with guard
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
