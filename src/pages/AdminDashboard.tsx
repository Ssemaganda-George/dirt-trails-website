import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogOut, Menu, X, BarChart3, Users, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminInquiries from '@/components/admin/AdminInquiries';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminLogin from './AdminLogin';

type TabType = 'inquiries' | 'bookings' | 'users' | 'analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('inquiries');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    setAuthError(null);

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!session) {
        setUser(null);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role,email')
        .eq('email', session.user.email)
        .single();

      if (profileError) {
        console.warn('Admin profile lookup failed:', profileError);
        const knownAdminEmails = ['ssgeorge480@gmail.com'];
        if (knownAdminEmails.includes(session.user.email || '')) {
          setUser(session.user);
          return;
        }
        setUser(null);
        setAuthError('Unable to verify admin access.');
        return;
      }

      if (profile?.role !== 'admin') {
        setUser(null);
        setAuthError('Admin access is required.');
        await supabase.auth.signOut();
        return;
      }

      setUser(session.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setAuthError('Authentication check failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out of the admin dashboard?');
    if (!confirmed) {
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setAuthError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login
  if (!user) {
    return <AdminLogin onLoginSuccess={checkAuth} authError={authError} />;
  }

  // Demo mode notice

  const tabs = [
    { id: 'inquiries' as TabType, label: 'Inquiries', icon: MessageSquare },
    { id: 'bookings' as TabType, label: 'Bookings', icon: BookOpen },
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col shadow-lg">
        <div className="px-8 py-6 border-b border-slate-800">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Admin Panel</p>
          <h1 className="mt-3 text-2xl font-semibold">Dirt Trails</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t border-slate-800 bg-slate-900">
          <div className="mb-3 text-sm text-slate-500">Logged in as</div>
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="mt-4 w-full border-slate-700 text-slate-200 hover:bg-slate-800"
            size="sm"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'inquiries' && <AdminInquiries />}
          {activeTab === 'bookings' && <AdminBookings />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'analytics' && <AdminAnalytics />}
        </div>
      </div>
    </div>
  );
}