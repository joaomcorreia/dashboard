'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function NotificationsPage() {
  return (
    <ComingSoonPage 
      title="Notification Center"
      description="Manage system notifications, alerts, and communication preferences."
      features={[
        "Push notification management",
        "Email notification templates",
        "SMS notification system",
        "Alert configuration",
        "Notification scheduling",
        "User communication preferences"
      ]}
    />
  );
}