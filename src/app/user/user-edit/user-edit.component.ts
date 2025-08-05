import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-edit-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgIf, FormsModule],
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: [''],
        email: ['', [Validators.required, Validators.email]],
      });

    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((user: User) => {
        this.userForm.patchValue(user);
      });
    }
  }
    onSubmit() {
        if (this.userForm.invalid) return;
        if (this.userId) {
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
            this.router.navigate(['/'])
        });
        }
    }
    back() {
        this.router.navigate(['/']);
    }
}