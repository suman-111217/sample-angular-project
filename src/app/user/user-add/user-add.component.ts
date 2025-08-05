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
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgIf, FormsModule],
  templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;
  submitted = false;

  // Template-Driven Form binding
  templateUser: Partial<User> = { firstName: '', email: '' };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
        firstName: ['', [Validators.required, this.noSpaceValidator]],
        lastName: ['', [Validators.required, this.noSpaceValidator]],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required],
        phoneNumber: [''],
        email: ['', [Validators.required, Validators.email]],
      }, {
        validators: this.passwordMatchValidator // FormGroup level validator
      });

    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((user: User) => {
        this.userForm.patchValue(user);
        this.templateUser = user; // for template demo
      });
    }
  }

  // ✅ 1. No spaces allowed in name
  noSpaceValidator(control: any) {
    if (control.value && control.value.includes(' ')) {
      return { hasSpace: true };
    }
    return null;
  }
  
  // ✅ 2. Strong password: 6+ chars, 1 upper, 1 lower, 1 number
  passwordStrengthValidator(control: any) {
    const value = control.value || '';
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const validLength = value.length >= 6;
  
    const isValid = hasUpper && hasLower && hasNumber && validLength;
    return isValid ? null : { weakPassword: true };
  }
  
  // ✅ 3. Password and Confirm Password match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const call = this.userId
      ? this.userService.updateUser(this.userId, this.userForm.value)
      : this.userService.createUser(this.userForm.value);

    call.subscribe(() => this.router.navigate(['/']));
  }

//   onTemplateSubmit(form: any) {
//     if (form.invalid) return;
//     this.userService.createUser(form.value).subscribe(() => {
//       this.router.navigate(['/']);
//     });
//   }
}
