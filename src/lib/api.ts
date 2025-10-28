interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private mockMode: boolean = true; // Set to false when Django backend is ready

  constructor() {
    this.baseUrl = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000';
  }

  setToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    if (this.accessToken) return this.accessToken;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  clearToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          // Redirect to login if needed
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthTokens> {
    if (this.mockMode) {
      // Mock authentication for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockTokens: AuthTokens = {
        access: 'mock-access-token-' + Date.now(),
        refresh: 'mock-refresh-token-' + Date.now()
      };

      this.setToken(mockTokens.access);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', mockTokens.refresh);
        // Store mock user data
        localStorage.setItem('mock_user', JSON.stringify({
          id: 1,
          email: email,
          first_name: 'Test',
          last_name: 'User',
          is_staff: email.includes('admin'),
          is_superuser: email.includes('admin')
        }));
      }

      return mockTokens;
    }

    const response = await this.request<AuthTokens>('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.setToken(response.access);
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', response.refresh);
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<User> {
    if (this.mockMode) {
      // Mock registration for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser: User = {
        id: Date.now(),
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        is_staff: false,
        is_superuser: false
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
      }

      return mockUser;
    }

    return this.request<User>('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout/', {
        method: 'POST',
      });
    } finally {
      this.clearToken();
    }
  }

  async getCurrentUser(): Promise<User> {
    if (this.mockMode) {
      // Mock current user for development
      if (typeof window !== 'undefined') {
        const mockUser = localStorage.getItem('mock_user');
        if (mockUser) {
          return JSON.parse(mockUser);
        }
      }
      throw new Error('No user found');
    }

    return this.request<User>('/api/auth/user/');
  }

  // Templates
  async getTemplates(filters?: Record<string, any>) {
    const params = new URLSearchParams(filters);
    return this.request(`/api/templates/?${params}`);
  }

  async getTemplate(id: number) {
    return this.request(`/api/templates/${id}/`);
  }

  async createTemplate(data: any) {
    return this.request('/api/templates/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTemplate(id: number, data: any) {
    return this.request(`/api/templates/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTemplate(id: number) {
    return this.request(`/api/templates/${id}/`, {
      method: 'DELETE',
    });
  }

  // Sections
  async getSections(filters?: Record<string, any>) {
    const params = new URLSearchParams(filters);
    return this.request(`/api/sections/?${params}`);
  }

  async getSection(id: number) {
    return this.request(`/api/sections/${id}/`);
  }

  async createSection(data: any) {
    return this.request('/api/sections/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSection(id: number, data: any) {
    return this.request(`/api/sections/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSection(id: number) {
    return this.request(`/api/sections/${id}/`, {
      method: 'DELETE',
    });
  }

  // Users (Admin only)
  async getUsers(filters?: Record<string, any>) {
    const params = new URLSearchParams(filters);
    return this.request(`/api/users/?${params}`);
  }

  async getUser(id: number) {
    return this.request(`/api/users/${id}/`);
  }

  async updateUser(id: number, data: any) {
    return this.request(`/api/users/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number) {
    return this.request(`/api/users/${id}/`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export type { User, AuthTokens };