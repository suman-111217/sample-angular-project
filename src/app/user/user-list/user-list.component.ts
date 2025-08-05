import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;
  loading = false;
  success: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  deleteUser(id: number) {
    this.success = null;
    this.userService.deleteUser(id.toString()).subscribe({
        next: (data) => {
            this.success = data.message;
            this.loadUsers();
            setTimeout(() => this.success = null, 3000); // clears message after 3 seconds
        },
      error: (err) => {
        this.error = 'Failed to delete user. Please try again.';
        console.error('Error deleting user:', err);
      }
    });
  }
}
