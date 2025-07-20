import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('devbook_token');
    const userData = localStorage.getItem('devbook_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('devbook_token');
        localStorage.removeItem('devbook_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('devbook_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = `fake-jwt-token-${Date.now()}`;
      
      localStorage.setItem('devbook_token', token);
      localStorage.setItem('devbook_user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('devbook_users') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email || u.username === username)) {
      setIsLoading(false);
      return false;
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('devbook_users', JSON.stringify(users));
    
    // Auto-login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    const token = `fake-jwt-token-${Date.now()}`;
    
    localStorage.setItem('devbook_token', token);
    localStorage.setItem('devbook_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('devbook_token');
    localStorage.removeItem('devbook_user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};