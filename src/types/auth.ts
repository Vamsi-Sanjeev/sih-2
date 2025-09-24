export interface User {
  id: string;
  username: string;
  role: 'operations' | 'admin';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}