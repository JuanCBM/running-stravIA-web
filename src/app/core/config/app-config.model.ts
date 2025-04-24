export interface AppConfig {
  apiUrl: string;
  useMockData: boolean;
}

export const DEFAULT_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:8080',
  useMockData: true
};
