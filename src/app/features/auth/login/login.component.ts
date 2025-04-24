import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...SHARED_IMPORTS, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  returnUrl = '/activities';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/activities']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required]
    });

    // Get return url from route parameters or default to '/activities'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/activities';
  }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = error.message || this.translate.instant('AUTH.LOGIN_FAILED');
          this.loading = false;
        }
      });
  }
}
