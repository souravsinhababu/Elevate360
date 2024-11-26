import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isAuthenticated = false;
  constructor(
     private router: Router
  ) {}
 

 
  login() {
    this.isAuthenticated = true;
    this.router.navigate(['/']); 
  }

  
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/home']); 
  }
}
