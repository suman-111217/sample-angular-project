import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.buildForm(); // rebuild form with/without confirmPassword
  }

  buildForm() {
    this.authForm = this.fb.group(
      {
        ...(this.isLoginMode ? {} : {
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]], 
          phoneNumber: [''],
        }),
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;

    if (this.isLoginMode) {
      console.log('Login with', email, password);
      this.authService.login(this.authForm.value).subscribe({
        next: (data) => {
            this.authService.setToken(data.access_token);
            this.router.navigate(['/list']);
        },
        error: (err) => {
        //   this.error = 'Failed to load users. Please try again.';
        //   this.loading = false;
          console.error('Error loading users:', err);
        }
      });
    } else {
      console.log('Register with', this.authForm.value);
      this.authService.register(this.authForm.value).subscribe({
        next: (data) => {
            this.authService.setToken(data.access_token);
            this.router.navigate(['/list']);
        },
        error: (err) => {
        //   this.error = 'Failed to load users. Please try again.';
        //   this.loading = false;
          console.error('Error loading users:', err);
        }
      });
    }
  }
}
