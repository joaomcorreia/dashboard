import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // In a real app, you would check user role here
  // For now, redirect to user dashboard
  redirect('/dashboard/user');
}