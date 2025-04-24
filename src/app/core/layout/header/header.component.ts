import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...SHARED_IMPORTS, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  languages: { code: string, name: string }[] = [];
  currentLang = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    this.languages = this.languageService.getLanguages();
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  switchLanguage(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
}
