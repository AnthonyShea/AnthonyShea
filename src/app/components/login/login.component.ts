import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Define the credentials object with default values.
  credentials = {
    name: '',
    password: ''
  };

  // Define an error property to store error messages.
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // This method will be called when the login form is submitted.
  onSubmit() {
    this.authService.login(this.credentials.name, this.credentials.password).subscribe(
      (response) => {
        // On successful login, navigate to the home page.
        this.router.navigate(['/home']);
      },
      (err) => {
        // If login fails, set the error message.
        this.error = 'Invalid credentials';
      }
    );
  }
}
