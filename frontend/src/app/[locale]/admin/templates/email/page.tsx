'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function EmailTemplatesPage() {
  return (
    <ComingSoonPage 
      title="Email Templates"
      description="Create and manage email templates for system communications."
      features={[
        "Welcome email templates",
        "Password reset templates",
        "Notification templates",
        "Marketing email templates",
        "Template preview and testing",
        "Multi-language email support"
      ]}
    />
  );
}