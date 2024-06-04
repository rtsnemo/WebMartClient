import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, CurrencyPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers:[UsersService]
})
export class UserProfileComponent {
  user: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);
      },
      error: (error: any) => {
        console.error('Error fetching user profile', error);
      }
    });
}}
