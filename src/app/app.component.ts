import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Running StravIA';

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    // Set available languages
    translate.addLangs(['en', 'es']);

    // Set fallback language
    translate.setDefaultLang('en');

    translate.use('en');
  }

  ngOnInit(): void {
    // The language service will initialize the language from localStorage or default
  }
}
