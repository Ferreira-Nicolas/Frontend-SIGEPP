// src/api/services/AuthService.ts
import type { User } from '../../types/User';      // crie ou ajuste sua tipagem de User
import { api } from './client';               // ← aqui

export interface Credentials { 
  username: string; 
  password: string; 
}

export interface LoginResponse { 
  accessToken: string; 
  refreshToken: string; 
  user: User; 
}

export const AuthService = {
  login: (creds: Credentials) =>
    api.post<LoginResponse>('login', creds).then(res => res.data),

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  refreshToken: (): Promise<{ accessToken: string }> => {
    const token = localStorage.getItem('refreshToken');
    return api
      .post<{ accessToken: string }>('/auth/refresh', { refreshToken: token })
      .then(res => res.data);
  },

  getProfile: (): Promise<User> =>
    api.get<{ user: User }>('/login/verify').then(res => res.data.user),
};
