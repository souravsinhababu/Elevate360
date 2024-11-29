import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';  
import { SignupComponent } from './signup/signup.component';
import { TraineeDashboardComponent } from './trainee-dashboard/trainee-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';  
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EditTrainerComponent } from './edit-trainer/edit-trainer.component';
import { EditTraineeComponent } from './edit-trainee/edit-trainee.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TraineeDashboardComponent,
    TrainerDashboardComponent,
    AdminDashboardComponent,
    HomeComponent,
    EditTrainerComponent,
    EditTraineeComponent,
    AddTraineeComponent,
    AddTrainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
