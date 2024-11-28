import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;  // Authentication state
  private userRole: string | null = null;    // User's role (e.g., 'admin', 'trainer', 'trainee')
  private token: string | null = null;       // Store JWT token (if applicable)

  constructor(private router: Router) {}

  // Log in the user and store the necessary information
  login(token: string, role: string): void {
    this.isAuthenticated = true;
    this.token = token;          // Store token (could be JWT)
    this.userRole = role;        // Store the user's role (admin, trainer, trainee)
  }

  // Log out the user and clear stored data
  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    this.userRole = null;
    this.router.navigate(['/login']);  // Redirect to login page
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Get the user's role
  getRole(): string | null {
    return this.userRole;
  }

  // Get the stored token (if using JWT for authentication)
  getToken(): string | null {
    return this.token;
  }
}
