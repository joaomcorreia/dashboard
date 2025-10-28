'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, type User } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize authentication state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    // For now, just set to not authenticated since we don't have user endpoints yet
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await apiClient.login(email, password);
      const user = await apiClient.getCurrentUser();
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await apiClient.register(userData);
      // Auto-login after successful registration
      await login(userData.email, userData.password);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await apiClient.logout();
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.warn('Logout request failed:', error);
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const refreshUser = async () => {
    if (!state.isAuthenticated) return;
    
    try {
      const user = await apiClient.getCurrentUser();
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      // If refresh fails, user might be logged out
      await logout();
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hooks for common auth checks
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}

export function useRequireAdmin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        window.location.href = '/login';
      } else if (!user?.is_staff && !user?.is_superuser) {
        window.location.href = '/dashboard/user';
      }
    }
  }, [user, isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading, isAdmin: user?.is_staff || user?.is_superuser };
}