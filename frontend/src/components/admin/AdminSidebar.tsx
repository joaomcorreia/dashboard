'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Users, 
  Building2, 
  Settings, 
  FileText, 
  DollarSign,
  BarChart3,
  UserCog,
  Globe,
  Package,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  submenu?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Overview',
    href: '/en/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'Users',
    href: '/en/admin/users',
    icon: <Users className="w-5 h-5" />,
    badge: '1,234',
  },
  {
    name: 'Businesses',
    href: '/en/admin/businesses',
    icon: <Building2 className="w-5 h-5" />,
    badge: '567',
  },
  {
    name: 'Finance',
    href: '/en/admin/finance',
    icon: <DollarSign className="w-5 h-5" />,
    submenu: [
      {
        name: 'Dashboard',
        href: '/en/admin/finance',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Expenses',
        href: '/en/admin/finance/expenses',
        icon: <FileText className="w-4 h-4" />,
      },
      {
        name: 'Import CSV',
        href: '/en/admin/finance/import',
        icon: <Package className="w-4 h-4" />,
      },
    ],
  },
  {
    name: 'Templates',
    href: '/en/admin/templates',
    icon: <FileText className="w-5 h-5" />,
    submenu: [
      {
        name: 'Website Templates',
        href: '/en/admin/templates',
        icon: <Globe className="w-4 h-4" />,
      },
      {
        name: 'Email Templates',
        href: '/en/admin/templates/email',
        icon: <FileText className="w-4 h-4" />,
      },
    ],
  },
  {
    name: 'Analytics',
    href: '/en/admin/analytics',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    name: 'Billing',
    href: '/en/admin/billing',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: 'Security',
    href: '/en/admin/security',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    name: 'Notifications',
    href: '/en/admin/notifications',
    icon: <Bell className="w-5 h-5" />,
    badge: '3',
  },
  {
    name: 'Settings',
    href: '/en/admin/settings',
    icon: <Settings className="w-5 h-5" />,
    submenu: [
      {
        name: 'General',
        href: '/en/admin/settings',
        icon: <Settings className="w-4 h-4" />,
      },
      {
        name: 'User Management',
        href: '/en/admin/settings/users',
        icon: <UserCog className="w-4 h-4" />,
      },
      {
        name: 'System',
        href: '/en/admin/settings/system',
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/en/admin') {
      return pathname === '/en/admin';
    }
    return pathname.startsWith(href);
  };

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.includes(item.href);
    const active = isActive(item.href);

    return (
      <div key={item.href}>
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer",
            depth > 0 && "ml-4 pl-6",
            active
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          )}
          onClick={hasSubmenu ? () => toggleExpanded(item.href) : undefined}
        >
          <Link 
            href={item.href}
            className="flex items-center flex-1"
            onClick={(e) => hasSubmenu && e.preventDefault()}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
          {hasSubmenu && (
            <div className="ml-2">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
        
        {hasSubmenu && isExpanded && (
          <div className="mt-1">
            {item.submenu!.map(subItem => renderSidebarItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-64 bg-white border-r border-gray-200 h-full", className)}>
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">JCW</span>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">Management Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <div className="space-y-1">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-3 px-3">
            Coming Soon
          </div>
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg">
              <HelpCircle className="w-5 h-5" />
              <span className="ml-3">Help Center</span>
            </div>
            <div className="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg">
              <FileText className="w-5 h-5" />
              <span className="ml-3">API Documentation</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}