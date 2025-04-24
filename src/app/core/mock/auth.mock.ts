import { User } from '../models/auth.model';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'user',
    email: 'user@example.com',
    firstName: 'Test',
    lastName: 'User'
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User'
  }
];

// Mock credentials for testing
export const VALID_CREDENTIALS = {
  username: 'user',
  password: 'password'
};

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};
