import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { RouterModule, Routes } from '@angular/router';  // Import RouterModule and Routes

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';  // Login Component
import { SignupComponent } from './signup/signup.component';  // Signup Component

// Define routes
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login page by default
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)  // Register the routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
