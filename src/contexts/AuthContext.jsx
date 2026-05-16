import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('aria_access_token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('aria_access_token');
          localStorage.removeItem('aria_refresh_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('aria_access_token', res.data.access_token);
    localStorage.setItem('aria_refresh_token', res.data.refresh_token);
    setUser(res.data.user);
    return res.data;
  };

  const signup = async (email, password) => {
    const res = await api.post('/auth/signup', { email, password });
    localStorage.setItem('aria_access_token', res.data.access_token);
    localStorage.setItem('aria_refresh_token', res.data.refresh_token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('aria_access_token');
    localStorage.removeItem('aria_refresh_token');
    setUser(null);
  };

  const setTokensFromOAuth = (accessToken, refreshToken) => {
    localStorage.setItem('aria_access_token', accessToken);
    localStorage.setItem('aria_refresh_token', refreshToken);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout, setTokensFromOAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
