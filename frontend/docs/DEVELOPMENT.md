# Development Guide

## Quick Start Commands

### Windows (Recommended)
```cmd
# Run the development menu
dev.bat

# Or run commands directly:
npm run dev        # Start development server
npm run build      # Build for production
npm run type-check # Check TypeScript
npm run lint       # Run ESLint
```

### Manual Commands
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Setup

1. **Create `.env.local`** (already created):
   ```env
   DJANGO_API_URL=http://127.0.0.1:8000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

2. **Ensure Django API is running** at `http://127.0.0.1:8000`

## Available Routes

### Public Routes
- `http://localhost:3001/en` - English homepage
- `http://localhost:3001/es` - Spanish homepage  
- `http://localhost:3001/fr` - French homepage
- `http://localhost:3001/de` - German homepage
- `http://localhost:3001/en/login` - Login page

### Dashboard Routes
- `http://localhost:3001/en/dashboard` - Dashboard redirect
- `http://localhost:3001/en/dashboard/user` - User dashboard
- `http://localhost:3001/en/dashboard/admin` - Admin dashboard

### Admin Routes
- `http://localhost:3001/en/dashboard/admin/templates` - Template management
- `http://localhost:3001/en/dashboard/admin/sections` - Section management
- `http://localhost:3001/en/dashboard/admin/users` - User management

## Troubleshooting

### Port Issues
If port 3000 is in use, the server will automatically use 3001 or the next available port.

### Build Errors
```bash
# Clear Next.js cache
rmdir /s /q .next
# Or on Unix: rm -rf .next

# Reinstall dependencies
rmdir /s /q node_modules
npm install
```

### TypeScript Errors
```bash
# Check all TypeScript errors
npm run type-check

# Auto-fix some issues
npm run lint -- --fix
```

## Development Workflow

1. **Start the server**: `npm run dev`
2. **Check for errors**: `npm run type-check`
3. **Fix linting issues**: `npm run lint`
4. **Test multiple languages**: Switch between `/en`, `/es`, `/fr`, `/de`
5. **Test responsive design**: Use browser dev tools

## Adding New Features

### New Components
1. Create in `src/components/ui/` for reusable UI
2. Create in `src/components/admin/` for admin-specific
3. Create in `src/components/user/` for user-specific

### New Pages
1. Create in `src/app/[locale]/` following the structure
2. Update navigation in relevant dashboard components
3. Add translations to `src/messages/*.json`

### New API Endpoints
1. Add methods to `src/lib/api.ts`
2. Update TypeScript interfaces
3. Handle authentication and error states

## Code Style

- **TypeScript**: Use strict mode, avoid `any`
- **Components**: Use function components with TypeScript interfaces
- **Styling**: Use Tailwind CSS classes, create reusable components
- **Naming**: Use PascalCase for components, camelCase for functions
- **Files**: Use PascalCase for component files, camelCase for utilities

## Testing Checklist

- [ ] All languages load correctly
- [ ] Navigation works between pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] API integration works (when Django is running)