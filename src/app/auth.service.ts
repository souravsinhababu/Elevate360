import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformDetectorService } from './platform-detector.service';  // Import PlatformDetectorService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;  // Authentication state
  private userRole: string | null = null;    // User's role (e.g., 'admin', 'trainer', 'trainee')
  private token: string | null = null;       // Store JWT token (if applicable)

  constructor(private router: Router, private platformDetectorService: PlatformDetectorService) {}

  // Log in the user and store the necessary information
  login(token: string, role: string): void {
    if (this.platformDetectorService.isBrowser()) {
      this.isAuthenticated = true;
      this.token = token;          // Store token (could be JWT)
      this.userRole = role;        // Store the user's role (admin, trainer, trainee)
      localStorage.setItem('authToken', token);  // Save token to localStorage
      
    }
  }

  // Log out the user and clear stored data
  logout(): void {
    if (this.platformDetectorService.isBrowser()) {
      this.isAuthenticated = false;
      this.token = null;
      this.userRole = null;
      localStorage.removeItem('authToken');  // Remove token from localStorage
      localStorage.removeItem('userId');  // Remove userId from localStorage
      localStorage.removeItem('username'); //Remove username from localStorage
      this.router.navigate(['/login']);  // Redirect to login page
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (this.platformDetectorService.isBrowser()) {
      return this.isAuthenticated || !!localStorage.getItem('authToken');
    }
    return false;
  }

  // Get the user's role
  getRole(): string | null {
    if (this.platformDetectorService.isBrowser()) {
      return this.userRole;
    }
    return null;
  }

  // Get the stored token (if using JWT for authentication)
  getToken(): string | null {
    if (this.platformDetectorService.isBrowser()) {
      return this.token || localStorage.getItem('authToken');
    }
    return null;
  }

  // Get the stored userId from localStorage
  getUserId(): number | null {
    if (this.platformDetectorService.isBrowser()) {
      return parseInt(localStorage.getItem('userId') || '0', 10);
    }
    return null;
  }
}