# Dashboard Server Manager
# Similar to XAMPP control panel but for your Next.js + Django servers

param(
    [string]$Action = ""
)

# Color functions for better UI
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }

# Check if servers are running
function Test-ServerStatus {
    $frontendRunning = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    $backendRunning = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
    
    return @{
        Frontend = $frontendRunning -ne $null
        Backend = $backendRunning -ne $null
    }
}

# Start Frontend Server
function Start-Frontend {
    Write-Info "🚀 Starting Next.js Frontend Server..."
    
    # Kill any existing node processes
    try {
        taskkill /F /IM node.exe *>$null
        Start-Sleep 2
    } catch {}
    
    # Start frontend in background
    $job = Start-Job -ScriptBlock {
        Set-Location "C:\projects\dashboard\frontend"
        npm run dev
    }
    
    Write-Info "⏳ Waiting for Next.js to start..."
    Start-Sleep 5
    
    # Check if it started successfully
    $status = Test-ServerStatus
    if ($status.Frontend) {
        Write-Success "✅ Frontend Server running on http://localhost:3000"
        return $true
    } else {
        Write-Error "❌ Failed to start Frontend Server"
        return $false
    }
}

# Start Backend Server
function Start-Backend {
    Write-Info "🐍 Starting Django Backend Server..."
    
    # Kill any existing python processes
    try {
        taskkill /F /IM python.exe *>$null
        Start-Sleep 2
    } catch {}
    
    # Start backend in background
    $job = Start-Job -ScriptBlock {
        Set-Location "C:\projects\dashboard\backend"
        python manage.py runserver 127.0.0.1:8000
    }
    
    Write-Info "⏳ Waiting for Django to start..."
    Start-Sleep 3
    
    # Check if it started successfully
    $status = Test-ServerStatus
    if ($status.Backend) {
        Write-Success "✅ Backend Server running on http://127.0.0.1:8000"
        return $true
    } else {
        Write-Error "❌ Failed to start Backend Server"
        return $false
    }
}

# Stop servers
function Stop-AllServers {
    Write-Warning "🛑 Stopping all servers..."
    
    try {
        taskkill /F /IM node.exe *>$null
        Write-Info "   Frontend stopped"
    } catch {
        Write-Info "   No Frontend processes found"
    }
    
    try {
        taskkill /F /IM python.exe *>$null
        Write-Info "   Backend stopped"
    } catch {
        Write-Info "   No Backend processes found"
    }
    
    Write-Success "✅ All servers stopped"
}

# Display server status
function Show-Status {
    $status = Test-ServerStatus
    
    Write-Host ""
    Write-Host "🖥️  DASHBOARD SERVER STATUS" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host "=" * 50
    
    if ($status.Frontend) {
        Write-Success "   Frontend (Next.js): ✅ RUNNING on http://localhost:3000"
    } else {
        Write-Error "   Frontend (Next.js): ❌ STOPPED"
    }
    
    if ($status.Backend) {
        Write-Success "   Backend (Django):   ✅ RUNNING on http://127.0.0.1:8000"
    } else {
        Write-Error "   Backend (Django):   ❌ STOPPED"
    }
    
    Write-Host "=" * 50
    Write-Host ""
}

# Main menu
function Show-Menu {
    Clear-Host
    Write-Host ""
    Write-Host "🚀 DASHBOARD SERVER MANAGER v1.0" -ForegroundColor White -BackgroundColor DarkGreen
    Write-Host "   Like XAMPP but for your Next.js + Django app" -ForegroundColor Gray
    Write-Host "=" * 60
    
    Show-Status
    
    Write-Host "ACTIONS:"
    Write-Host "  1. Start All Servers"
    Write-Host "  2. Start Frontend Only (Next.js)"
    Write-Host "  3. Start Backend Only (Django)"
    Write-Host "  4. Stop All Servers"
    Write-Host "  5. Restart All Servers"
    Write-Host "  6. Open Frontend (http://localhost:3000)"
    Write-Host "  7. Open Admin Templates (http://localhost:3000/en/admin/templates)"
    Write-Host "  8. Open Builder (http://localhost:3000/en/builder)"
    Write-Host "  9. Refresh Status"
    Write-Host "  0. Exit"
    Write-Host ""
}

# Quick actions for command line
switch ($Action.ToLower()) {
    "start" {
        Write-Info "🚀 Starting all servers..."
        Start-Backend
        Start-Frontend
        Show-Status
        exit
    }
    "stop" {
        Stop-AllServers
        exit
    }
    "status" {
        Show-Status
        exit
    }
    "frontend" {
        Start-Frontend
        exit
    }
    "backend" {
        Start-Backend
        exit
    }
}

# Interactive menu
do {
    Show-Menu
    $choice = Read-Host "Choose an action (0-9)"
    
    switch ($choice) {
        "1" {
            Write-Info "🚀 Starting all servers..."
            $backendOk = Start-Backend
            if ($backendOk) {
                Start-Frontend
            }
            Read-Host "Press Enter to continue..."
        }
        "2" {
            Start-Frontend
            Read-Host "Press Enter to continue..."
        }
        "3" {
            Start-Backend
            Read-Host "Press Enter to continue..."
        }
        "4" {
            Stop-AllServers
            Read-Host "Press Enter to continue..."
        }
        "5" {
            Write-Info "🔄 Restarting all servers..."
            Stop-AllServers
            Start-Sleep 2
            $backendOk = Start-Backend
            if ($backendOk) {
                Start-Frontend
            }
            Read-Host "Press Enter to continue..."
        }
        "6" {
            $status = Test-ServerStatus
            if ($status.Frontend) {
                Write-Info "🌐 Opening Frontend..."
                Start-Process "http://localhost:3000"
            } else {
                Write-Error "❌ Frontend is not running! Start it first."
                Read-Host "Press Enter to continue..."
            }
        }
        "7" {
            $status = Test-ServerStatus
            if ($status.Frontend) {
                Write-Info "🌐 Opening Admin Templates..."
                Start-Process "http://localhost:3000/en/admin/templates"
            } else {
                Write-Error "❌ Frontend is not running! Start it first."
                Read-Host "Press Enter to continue..."
            }
        }
        "8" {
            $status = Test-ServerStatus
            if ($status.Frontend) {
                Write-Info "🌐 Opening Builder..."
                Start-Process "http://localhost:3000/en/builder"
            } else {
                Write-Error "❌ Frontend is not running! Start it first."
                Read-Host "Press Enter to continue..."
            }
        }
        "9" {
            # Just refresh - the menu will show updated status
        }
        "0" {
            Write-Info "👋 Goodbye!"
            break
        }
        default {
            Write-Warning "Invalid choice. Please select 0-9."
            Start-Sleep 2
        }
    }
} while ($true)