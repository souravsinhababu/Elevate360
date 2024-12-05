import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Authentication';
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