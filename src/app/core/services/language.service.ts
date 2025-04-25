import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('');

  // Available languages
  private languages = [
    { code: 'en', name: 'LANGUAGE.ENGLISH' },
    { code: 'es', name: 'LANGUAGE.SPANISH' }
  ];

  constructor(private translate: TranslateService) {
    // Initialize with saved language or default
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  /**
   * Set the current language
   */
  setLanguage(langCode: string): void {
    // Save to localStorage
    localStorage.setItem('language', langCode);

    // Update the current language in the translate service
    this.translate.use(langCode);

    // Update the BehaviorSubject
    this.currentLangSubject.next(langCode);
  }

  /**
   * Get the current language as an Observable
   */
  getCurrentLanguage(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  /**
   * Get the current language code
   */
  getCurrentLanguageCode(): string {
    return this.currentLangSubject.value;
  }

  /**
   * Get all available languages
   */
  getLanguages(): { code: string, name: string }[] {
    return this.languages;
  }
}
