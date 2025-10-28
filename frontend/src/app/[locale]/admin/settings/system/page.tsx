'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function SystemSettingsPage() {
  return (
    <ComingSoonPage 
      title="System Settings"
      description="Configure core system parameters and performance settings."
      features={[
        "Database configuration",
        "Cache management",
        "API rate limiting",
        "File upload settings",
        "Performance monitoring",
        "System maintenance mode"
      ]}
    />
  );
}