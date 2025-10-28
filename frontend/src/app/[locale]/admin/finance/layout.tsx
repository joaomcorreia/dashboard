import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance Dashboard | Admin',
  description: 'Manage business expenses and financial tracking',
};

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="finance-layout">
      {children}
    </div>
  );
}