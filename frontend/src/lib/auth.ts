import { apiClient, type User } from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthManager {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    const token = apiClient.getToken();
    if (token) {
      try {
        const user = await apiClient.getCurrentUser();
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        // Token is invalid, clear it
        apiClient.clearToken();
        this.setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      this.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }

  private setState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AuthState {
    return this.state;
  }

  async login(email: string, password: string): Promise<void> {
    this.setState({ isLoading: true });
    try {
      await apiClient.login(email, password);
      const user = await apiClient.getCurrentUser();
      
      this.setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.setState({ isLoading: true });
    try {
      await apiClient.logout();
    } finally {
      this.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }

  isAdmin(): boolean {
    return this.state.user?.is_staff || this.state.user?.is_superuser || false;
  }

  requireAuth(): void {
    if (!this.state.isAuthenticated && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  requireAdmin(): void {
    this.requireAuth();
    if (!this.isAdmin() && typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
  }
}

export const authManager = new AuthManager();
export type { AuthState, User };