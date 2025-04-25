import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...SHARED_IMPORTS, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  stravaLoading = false;
  error = '';
  returnUrl = '/activities';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private configService: ConfigService
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/activities']);
    }

    // Get return url from route parameters or default to '/activities'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/activities';
  }

  ngOnInit(): void {
    // Check if we have a code parameter in the URL (Strava callback)
    const code = this.route.snapshot.queryParams['code'];
    if (code) {
      this.handleStravaCallback(code);
    }

    // Check if we have a token parameter in the URL (auth-success)
    const token = this.route.snapshot.queryParams['token'];
    if (token) {
      this.handleAuthSuccess(token);
    }
  }

  handleAuthSuccess(token: string): void {
    // Store the token
    localStorage.setItem('auth_token', token);

    // Update the auth service
    this.authService.loadUserFromStorage();

    // Redirect to activities
    this.router.navigate(['/activities']);
  }

  handleStravaCallback(code: string): void {
    this.stravaLoading = true;
    this.error = '';

    this.authService.handleStravaCallback(code)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = error.message || this.translate.instant('AUTH.STRAVA_LOGIN_FAILED');
          this.stravaLoading = false;
        }
      });
  }

  loginWithStrava(): void {
    this.stravaLoading = true;
    this.error = '';

    if (this.configService.useMockData) {
      // Use mock login with default credentials when useMockData is true
      this.authService.login({ username: 'user', password: 'password' })
        .subscribe({
          next: (user) => {
            this.router.navigate([this.returnUrl]);
          },
          error: error => {
            this.error = error.message || this.translate.instant('AUTH.LOGIN_FAILED');
            this.stravaLoading = false;
          }
        });
    } else {
      // Use Strava authentication when useMockData is false
      this.authService.getStravaAuthUrl()
        .subscribe({
          next: (url) => {
            // Redirect to Strava authorization page
            window.location.href = url;
          },
          error: error => {
            this.error = error.message || this.translate.instant('AUTH.STRAVA_LOGIN_FAILED');
            this.stravaLoading = false;
          }
        });
    }
  }

}
