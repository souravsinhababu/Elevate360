import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TraineeDashboardComponent } from './components/trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';  
import { AppRoutingModule } from '../core/routes/app-routing.module';
import { EditTrainerComponent } from './components/edit-trainer/edit-trainer.component';
import { EditTraineeComponent } from './components/edit-trainee/edit-trainee.component';
import { AddTraineeComponent } from './components/add-trainee/add-trainee.component';
import { AddTrainerComponent } from './components/add-trainer/add-trainer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TraineeDashboardComponent,
    TrainerDashboardComponent,
    AdminDashboardComponent,
    EditTrainerComponent,
    EditTraineeComponent,
    AddTraineeComponent,
    AddTrainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
