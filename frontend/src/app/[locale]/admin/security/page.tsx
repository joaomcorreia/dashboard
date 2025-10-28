'use client';

import ComingSoonPage from '@/components/admin/ComingSoonPage';

export default function SecurityPage() {
  return (
    <ComingSoonPage 
      title="Security Center"
      description="Advanced security management and monitoring tools for platform protection."
      features={[
        "User authentication logs",
        "Security incident tracking",
        "API rate limiting configuration",
        "Two-factor authentication settings",
        "IP whitelisting/blacklisting",
        "Security audit reports"
      ]}
    />
  );
}