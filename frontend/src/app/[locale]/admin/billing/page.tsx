'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function BillingPage() {
  return (
    <ComingSoonPage 
      title="Billing Management"
      description="Comprehensive billing and payment management system for the platform."
      features={[
        "Subscription management",
        "Payment processing",
        "Invoice generation",
        "Revenue analytics",
        "Payment gateway integration",
        "Billing history and reports"
      ]}
    />
  );
}