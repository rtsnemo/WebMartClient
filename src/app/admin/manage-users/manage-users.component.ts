import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
  providers: [UsersService]
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);

    });
  }

  onFileSelected(event: any, user: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        user.profileImageBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateUser(user: any): void {
    this.userService.updateUser(user.userID, user.name, user.profileImageBase64).subscribe(response => {
      console.log('User updated successfully', response);
      this.loadUsers(); // Обновляем список пользователей после обновления
    }, error => {
      console.error('Error updating user', error);
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(response => {
      this.loadUsers(); // Обновляем список пользователей после удаления
    }, error => {
      console.error('Error deleting user', error);
    });
  }
}
