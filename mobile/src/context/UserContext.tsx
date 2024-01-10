import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  email: '',
  token: '',
  id: null,
  setAuthData: (email: string, token: string, id: number) => {},
  clearAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState(null);

  const setAuthData = (email: string, token: string, id: number) => {
    setEmail(email);
    setToken(token);
    setId(id);
  };

  const clearAuthData = () => {
    setEmail('');
    setToken('');
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ email, token, id, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
