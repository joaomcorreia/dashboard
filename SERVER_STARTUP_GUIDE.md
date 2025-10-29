# Dashboard Server Startup Scripts

## Quick Start
Double-click any of these files to start your servers:

### 🚀 **start-both.bat**
- Starts both backend and frontend servers in separate windows
- **Recommended for development**

### 🔧 Individual Server Scripts:
- **start-backend.bat** - Django backend only (port 8000)
- **start-frontend.bat** - Next.js frontend only (port 3004)

### 🛑 **stop-servers.bat**
- Stops all running Node.js and Python processes

## Manual Commands
If you prefer terminal commands:

### Backend (Django):
```bash
cd C:\projects\dashboard\backend
python manage.py runserver 127.0.0.1:8000
```

### Frontend (Next.js):
```bash
cd C:\projects\dashboard\frontend
npm run dev
```

## Server URLs
- **Backend API**: http://127.0.0.1:8000
- **Frontend App**: http://localhost:3004 (or 3000)
- **Login Page**: http://localhost:3004/en/login
- **Admin Panel**: http://localhost:3004/en/admin
- **Preview/Builder**: http://localhost:3004/preview

## Login Credentials (Mock Mode)
Use any of these specific email/password combinations:

### 🔧 **User Types & Redirects:**
- **Admin User**: `admin@test.com` / `123456`
  - *Redirects to*: `/dashboard/user` (user dashboard after payment)
  
- **Regular User**: `user@test.com` / `123456` 
  - *Redirects to*: `/builder` (website builder for new users)
  
- **Business Admin**: `business@example.com` / `password`
  - *Redirects to*: `/admin` (admin dashboard with full management)

### 📋 **User Flow Summary:**
- **admin@test.com** → Paid user dashboard (user management)
- **user@test.com** → Website builder (create websites)  
- **business@example.com** → Admin panel (business management)

## Troubleshooting
- If ports are busy, the frontend will auto-select available ports
- Check Windows Firewall if you can't access the servers
- Run `stop-servers.bat` if you need to restart everything