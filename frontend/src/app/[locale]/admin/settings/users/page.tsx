'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function UserManagementSettingsPage() {
  return (
    <ComingSoonPage 
      title="User Management Settings"
      description="Configure user roles, permissions, and account management policies."
      features={[
        "Role-based access control",
        "Permission management",
        "User registration policies",
        "Account verification settings",
        "Password policies",
        "Session management"
      ]}
    />
  );
}