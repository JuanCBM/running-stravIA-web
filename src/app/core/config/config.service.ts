import {Injectable} from '@angular/core';
import {AppConfig, DEFAULT_CONFIG} from './app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = DEFAULT_CONFIG;

  constructor() { }

  getConfig(): AppConfig {
    return this.config;
  }

  setConfig(config: Partial<AppConfig>): void {
    this.config = { ...this.config, ...config };
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get useMockData(): boolean {
    return this.config.useMockData;
  }
}
