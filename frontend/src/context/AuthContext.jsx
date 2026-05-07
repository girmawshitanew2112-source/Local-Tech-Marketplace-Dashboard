import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('ltm_token')));

  useEffect(() => {
    if (!localStorage.getItem('ltm_token')) return;
    authService.me().then(({ data }) => setUser(data.user)).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login: async (payload) => {
      const { data } = await authService.login(payload);
      localStorage.setItem('ltm_token', data.token);
      setUser(data.user);
      return data.user;
    },
    register: async (payload) => {
      const { data } = await authService.register(payload);
      localStorage.setItem('ltm_token', data.token);
      setUser(data.user);
      return data.user;
    },
    logout: () => { localStorage.removeItem('ltm_token'); setUser(null); }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
