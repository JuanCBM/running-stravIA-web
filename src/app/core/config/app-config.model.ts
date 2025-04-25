import { environment } from '../../../environments/environment';

export interface AppConfig {
  apiUrl: string;
  useMockData: boolean;
  useAuthMockData: boolean;
}

export const DEFAULT_CONFIG: AppConfig = {
  apiUrl: environment.apiUrl,
  useMockData: environment.useMockData,
  useAuthMockData: environment.useAuthMockData
};
