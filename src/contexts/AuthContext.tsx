// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
  type FC,
} from 'react';
import { useNavigate } from 'react-router';
import { AuthService, type Credentials, type LoginResponse } from '../api/services/AuthService';
import type { User } from '../types/User';
interface AuthContextData {
  user: User | null;
  login: (creds: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // valida token e atualiza perfil
    if (user) {
      AuthService.getProfile()
        .then(fresh => {
          setUser(fresh);
          localStorage.setItem('user', JSON.stringify(fresh));
        })
        .catch(() => handleLogout());
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const login = async (creds: Credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { accessToken, refreshToken, user: u } =
        await AuthService.login(creds);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
      navigate('/home', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => handleLogout();

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}