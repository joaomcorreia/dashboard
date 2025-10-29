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
  user_type?: string;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  business_name: string;
  business_type: string;
  preferred_domain?: string;
  address?: string;
  phone?: string;
}

interface BrandProfile {
  id: number;
  business_name: string;
  business_type: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  preferred_domain: string;
  domain_available: boolean;
  logo?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  color_source: 'logo' | 'preset';
  tone: string;
  services: string[];
  email_verified: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface ServiceCatalog {
  business_type: string;
  options: string[];
}

interface DomainCheck {
  available: boolean;
  domain: string;
}

interface AITextSuggestion {
  suggestion: string;
  business_name: string;
  business_type: string;
  tone: string;
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private mockMode: boolean = false; // Disabled - using real API

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';
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
      localStorage.removeItem('mock_user');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for session auth
      ...options,
    };

    // Remove Content-Type for FormData
    if (options.body instanceof FormData) {
      const headers = { ...config.headers } as any;
      delete headers['Content-Type'];
      config.headers = headers;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch {
          // If can't parse JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication (Django session-based)
  async login(email: string, password: string): Promise<{ success: boolean }> {
    if (this.mockMode) {
      // Mock login for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (typeof window !== 'undefined') {
        const emailLower = email.toLowerCase();
        let userData;
        
        if (emailLower === 'admin@test.com') {
          // Admin user (after payment) - regular user with admin-like privileges
          userData = {
            id: 1,
            email: email,
            first_name: 'Admin',
            last_name: 'User',
            is_staff: false,
            is_superuser: false,
            user_type: 'admin_paid'
          };
        } else if (emailLower === 'user@test.com') {
          // Regular user building website
          userData = {
            id: 2,
            email: email,
            first_name: 'Regular',
            last_name: 'User',
            is_staff: false,
            is_superuser: false,
            user_type: 'regular'
          };
        } else if (emailLower === 'business@example.com') {
          // Business user with admin dashboard access
          userData = {
            id: 3,
            email: email,
            first_name: 'Business',
            last_name: 'Admin',
            is_staff: true,
            is_superuser: true,
            user_type: 'business_admin'
          };
        } else {
          // Default user
          userData = {
            id: 4,
            email: email,
            first_name: 'Test',
            last_name: 'User',
            is_staff: email.includes('admin'),
            is_superuser: email.includes('admin'),
            user_type: 'default'
          };
        }
        
        localStorage.setItem('mock_user', JSON.stringify(userData));
      }
      
      return { success: true };
    }

    // For production: implement proper Django session authentication
    return this.request<{ success: boolean }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Registration with business info
  async registerWithBusiness(data: RegistrationData): Promise<{ user_id: number; require_email_verification: boolean }> {
    return this.request<{ user_id: number; require_email_verification: boolean }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Domain availability check
  async checkDomain(domain: string): Promise<DomainCheck> {
    return this.request<DomainCheck>(`/domain/check/?name=${encodeURIComponent(domain)}`);
  }

  // Email verification (dev stub)
  async verifyEmail(): Promise<{ message: string; verified: boolean }> {
    return this.request<{ message: string; verified: boolean }>('/auth/verify-email/', {
      method: 'POST',
    });
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
    if (this.mockMode) {
      // In mock mode, just clear the tokens and mock user data
      this.clearToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_user');
      }
      return;
    }

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

    // For now, throw error since we don't have user endpoint implemented yet
    // This will be caught by AuthContext and handled gracefully
    throw new Error('User endpoint not implemented yet');
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