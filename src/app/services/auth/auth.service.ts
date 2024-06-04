import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7115/api';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/sign-in`, credentials).pipe(
      map((response: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.JWT);
          localStorage.setItem('role', response.Role);
        }
        return response;
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}
