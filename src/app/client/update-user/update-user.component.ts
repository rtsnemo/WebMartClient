import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
  providers:[UsersService]
})
export class UpdateUserComponent implements OnInit {
  userId!: string;
  name!: string;
  base64Image!: string;
  profileImagePath!: string;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersService.getProfile().subscribe(
      data => {
        this.userId = data.userID;
        this.name = data.name;
        this.base64Image = data.profileImage.base64Data;
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateUser(): void {
    this.usersService.updateUser(this.userId, this.name, this.base64Image).subscribe(
      response => {
        console.log('User updated successfully', response);
        this.profileImagePath = response.profileImagePath;
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }
}
