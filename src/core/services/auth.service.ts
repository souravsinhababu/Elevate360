import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string | null = null;

  constructor() {
    // Check if username is already stored in localStorage on page load
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);  // Save the username in localStorage
  }

  getUsername(): string | null {
    return this.username;
  }

  clearUsername() {
    this.username = null;
    localStorage.removeItem('username');  // Remove the username from localStorage
  }
}
