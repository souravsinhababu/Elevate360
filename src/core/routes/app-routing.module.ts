import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard'; 
import { LoginComponent } from '../../app/components/login/login.component';
import { AdminDashboardComponent } from '../../app/components/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from '../../app/components/signup/signup.component';
import { TraineeDashboardComponent } from '../../app/components/trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from '../../app/components/trainer-dashboard/trainer-dashboard.component';

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
