import UserDashboard from '@/components/dashboard/UserDashboard';
import Header from '@/components/layout/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <UserDashboard />
    </div>
  );
}