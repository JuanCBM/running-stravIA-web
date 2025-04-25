import { environment } from '../../../environments/environment';

export interface AppConfig {
  apiUrl: string;
  useMockData: boolean;
}

export const DEFAULT_CONFIG: AppConfig = {
  apiUrl: environment.apiUrl,
  useMockData: environment.useMockData
};
