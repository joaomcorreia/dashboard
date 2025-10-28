# Just Code Works (JCW) - SaaS Website Builder

A modern multi-tenant SaaS platform that allows users to build professional websites using pre-designed templates and sections.

## 🚀 Features

- **Multi-language Support**: English, Spanish, French, German with next-intl
- **Admin Dashboard**: Template and section management, user management, analytics
- **User Dashboard**: Website builder, template selection, site management
- **Multi-tenant Architecture**: Subdomain-based tenancy
- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Django API Integration**: JWT authentication, RESTful API

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Internationalization**: next-intl
- **Authentication**: JWT with Django backend
- **Backend**: Django API (running separately at http://127.0.0.1:8000)

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx            # Homepage
│   │   ├── dashboard/
│   │   │   ├── admin/          # Admin panel
│   │   │   │   ├── page.tsx    # Admin dashboard
│   │   │   │   ├── templates/  # Template management
│   │   │   │   ├── sections/   # Section management
│   │   │   │   └── users/      # User management
│   │   │   └── user/           # User dashboard
│   │   │       ├── page.tsx    # User dashboard
│   │   │       ├── my-site/    # Site builder
│   │   │       └── settings/   # User settings
│   │   └── websites/
│   │       └── [slug]/         # Generated user sites
│   ├── api/                    # API routes (if needed)
│   └── globals.css
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── admin/                  # Admin-specific components
│   ├── user/                   # User dashboard components
│   └── website-builder/        # Site building components
├── lib/
│   ├── api.ts                  # API client for Django backend
│   ├── auth.ts                 # JWT authentication
│   └── utils.ts                # Utility functions
├── messages/                   # Translation files
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   └── de.json
└── middleware.ts               # i18n middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- Django API server running at http://127.0.0.1:8000

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Copy .env.local and update values if needed
   DJANGO_API_URL=http://127.0.0.1:8000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Homepage: http://localhost:3000
   - English: http://localhost:3000/en
   - Spanish: http://localhost:3000/es
   - French: http://localhost:3000/fr
   - German: http://localhost:3000/de

### Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

## 🌐 Multi-language Support

The app supports 4 languages with automatic locale detection:

- **English** (`en`) - Default
- **Spanish** (`es`)
- **French** (`fr`)
- **German** (`de`)

URLs are structured as: `/{locale}/path`

## 🔐 Authentication

The app integrates with a Django backend for authentication:

- JWT token-based authentication
- Role-based access (admin vs user)
- Protected routes for dashboard areas
- API client with automatic token management

## 📱 Routes

### Public Routes
- `/` - Homepage with language selection
- `/{locale}` - Localized homepage

### Dashboard Routes
- `/{locale}/dashboard` - Redirects to appropriate dashboard
- `/{locale}/dashboard/user` - User dashboard
- `/{locale}/dashboard/admin` - Admin dashboard (admin only)

### Admin Routes
- `/{locale}/dashboard/admin/templates` - Template management
- `/{locale}/dashboard/admin/sections` - Section management
- `/{locale}/dashboard/admin/users` - User management
- `/{locale}/dashboard/admin/tenants` - Tenant management

### User Routes
- `/{locale}/dashboard/user/my-site` - Site builder
- `/{locale}/dashboard/user/templates` - Template selection
- `/{locale}/dashboard/user/settings` - User settings

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Slate (#64748b)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

### Components
- Reusable UI components in `/src/components/ui/`
- Consistent styling with Tailwind CSS
- Responsive design (mobile-first)
- Accessibility compliant

## 🔧 API Integration

The frontend connects to a Django API with the following endpoints:

- `POST /api/auth/login/` - JWT authentication
- `GET /api/auth/user/` - Get current user
- `GET /api/templates/` - List templates
- `GET /api/sections/` - List sections
- `GET /api/users/` - List users (admin only)

## 🚨 Important Notes

### Windows Development
- Use semicolons (`;`) instead of `&&` in PowerShell commands
- Use absolute paths for better reliability
- Clear `.next` cache if build issues occur

### Common Commands
```bash
# Clear build cache
rm -rf .next

# Kill processes (Windows)
taskkill /f /im node.exe 2>$null

# Run on different port
npm run dev -- -p 3001
```

## 🔮 Roadmap

### v0 (Current)
- ✅ Project structure and configuration
- ✅ Multi-language support setup
- ✅ Basic dashboard layouts
- ✅ API client foundation

### v1 (Next)
- Template and section CRUD operations
- Website builder interface
- User authentication flow
- Multi-tenant subdomain routing
- File upload and media management

### Future
- Payment integration
- Custom domain support
- Advanced analytics
- Email notifications
- SSO integration

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript strictly
3. Follow the naming conventions
4. Test on multiple locales
5. Ensure responsive design

## 📄 License

Private project - All rights reserved.