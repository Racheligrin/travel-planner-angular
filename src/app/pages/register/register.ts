import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  passwordVerify = '';
  fullName = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    if (this.password !== this.passwordVerify) {
      this.error = 'הסיסמאות אינן תואמות';
      return;
    }
    this.auth.register(this.username, this.password, this.fullName).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (e) => this.error = e.message
    });
  }
}
