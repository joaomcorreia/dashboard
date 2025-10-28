# API Integration Guide

## Overview

The Next.js frontend integrates with a Django backend API running at `http://127.0.0.1:8000`.

## Authentication Flow

### JWT Token Management
```typescript
// Login
const tokens = await apiClient.login(email, password);
// Tokens are automatically stored in localStorage

// API calls automatically include Bearer token
const user = await apiClient.getCurrentUser();

// Logout
await apiClient.logout();
// Tokens are automatically cleared
```

### Protected Routes
```typescript
// Check authentication
authManager.requireAuth(); // Redirects to login if not authenticated
authManager.requireAdmin(); // Redirects if not admin
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login with email/password
- `POST /api/auth/logout/` - Logout current user
- `GET /api/auth/user/` - Get current user info

### Templates
- `GET /api/templates/` - List all templates
- `GET /api/templates/{id}/` - Get specific template
- `POST /api/templates/` - Create new template (admin)
- `PUT /api/templates/{id}/` - Update template (admin)
- `DELETE /api/templates/{id}/` - Delete template (admin)

### Sections
- `GET /api/sections/` - List all sections
- `GET /api/sections/{id}/` - Get specific section
- `POST /api/sections/` - Create new section (admin)
- `PUT /api/sections/{id}/` - Update section (admin)
- `DELETE /api/sections/{id}/` - Delete section (admin)

### Users (Admin Only)
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get specific user
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

## Usage Examples

### Login Flow
```typescript
import { authManager } from '@/lib/auth';

// In a login component
const handleLogin = async (email: string, password: string) => {
  try {
    await authManager.login(email, password);
    // User is now authenticated, redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    // Handle login error
    setError('Invalid credentials');
  }
};
```

### Fetching Data
```typescript
import { apiClient } from '@/lib/api';

// Get templates
const templates = await apiClient.getTemplates({
  category: 'restaurant',
  status: 'published'
});

// Get sections
const sections = await apiClient.getSections();
```

### Creating Resources (Admin)
```typescript
// Create new template
const newTemplate = await apiClient.createTemplate({
  name: 'jcw-rest-03-modern',
  category: 'restaurant',
  sections: [1, 2, 3, 4], // Section IDs
  preview_image: 'https://example.com/preview.jpg'
});
```

## Error Handling

### Automatic Token Refresh
The API client automatically handles token expiration:
- On 401 responses, tokens are cleared
- User is redirected to login page

### Error Types
```typescript
try {
  const data = await apiClient.getTemplates();
} catch (error) {
  if (error.status === 401) {
    // Unauthorized - user needs to login
  } else if (error.status === 403) {
    // Forbidden - user doesn't have permission
  } else if (error.status === 404) {
    // Not found
  } else {
    // Other server error
  }
}
```

## Request/Response Examples

### Login Request
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Templates Request
```http
GET /api/templates/?category=restaurant&status=published
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### Templates Response
```json
{
  "count": 24,
  "results": [
    {
      "id": 1,
      "name": "jcw-rest-01-modern",
      "category": "restaurant",
      "status": "published",
      "sections": [
        {
          "id": 1,
          "name": "jcw-rest-01-hero01",
          "type": "hero"
        }
      ],
      "preview_image": "https://example.com/preview.jpg",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Environment Variables

```env
# Required
DJANGO_API_URL=http://127.0.0.1:8000

# Optional (for NextAuth if used)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Development Notes

### CORS Configuration
Make sure Django API allows requests from Next.js development server:
```python
# In Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]
```

### API Client Configuration
The API client is pre-configured but can be customized:
```typescript
// In src/lib/api.ts
const apiClient = new ApiClient();

// Override base URL if needed
apiClient.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
```