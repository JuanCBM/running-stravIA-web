import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/auth.model';
import { ConfigService } from '../config/config.service';
import { MOCK_USERS, VALID_CREDENTIALS, ADMIN_CREDENTIALS } from '../mock/auth.mock';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // In a real app, you might decode the JWT token to get user info
        // For this example, we'll just use a mock user
        const user = MOCK_USERS[0];
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem(this.tokenKey);
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<User> {
    if (this.configService.useAuthMockData) {
      return this.mockLogin(loginRequest);
    } else {
      return this.http.post<LoginResponse>(`${this.configService.apiUrl}/auth/login`, loginRequest)
        .pipe(
          tap(response => {
            localStorage.setItem(this.tokenKey, response.token);
            this.currentUserSubject.next(response.user);
          }),
          map(response => response.user),
          catchError(error => {
            return throwError(() => new Error('Login failed'));
          })
        );
    }
  }

  private mockLogin(loginRequest: LoginRequest): Observable<User> {
    const { username, password } = loginRequest;

    // Check if credentials match any of our mock users
    if (
      (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) ||
      (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password)
    ) {
      const user = username === 'admin' ? MOCK_USERS[1] : MOCK_USERS[0];

      // Store token in localStorage (in a real app, this would be a JWT)
      localStorage.setItem(this.tokenKey, 'mock-jwt-token');

      // Update the current user
      this.currentUserSubject.next(user);

      return of(user);
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Strava authentication methods
  getStravaAuthUrl(): Observable<string> {
    return this.http.get(`${this.configService.apiUrl}/strava/auth`, { responseType: 'text' });
  }

  handleStravaCallback(code: string): Observable<any> {
    // This method will be called when Strava redirects back to our app
    // The code parameter is provided by Strava in the callback URL
    return this.http.get<any>(`${this.configService.apiUrl}/strava/callback?code=${code}`)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            // If we have user info, update the current user
            if (response.user) {
              this.currentUserSubject.next(response.user);
              localStorage.setItem(this.tokenKey, 'strava-auth-token');
            }
          }
        })
      );
  }

  getStravaActivities(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('No Strava token available'));
    }
    return this.http.get<any>(`${this.configService.apiUrl}/strava/activities?token=${token}`);
  }
}
