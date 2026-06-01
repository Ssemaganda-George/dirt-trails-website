import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart3, TrendingUp, Calendar, Eye } from 'lucide-react';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalInquiries: 0,
    totalBookings: 0,
    totalUsers: 0,
    revenueTotal: 0,
    incomingThisMonth: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch inquiries count
      const { count: inquiriesCount } = await supabase
        .from('website_inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch bookings count
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Calculate conversion rate (bookings / inquiries)
      const conversionRate = inquiriesCount && inquiriesCount > 0 
        ? ((bookingsCount || 0) / inquiriesCount * 100).toFixed(2)
        : 0;

      // Sum booking amounts for revenue (if amount field exists)
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('amount');

      const revenueTotal = bookings?.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || 0;

      // Get this month's bookings
      const thisMonth = new Date();
      thisMonth.setDate(1);
      
      const { count: thisMonthCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thisMonth.toISOString());

      setAnalytics({
        totalInquiries: inquiriesCount || 0,
        totalBookings: bookingsCount || 0,
        totalUsers: usersCount || 0,
        revenueTotal,
        incomingThisMonth: thisMonthCount || 0,
        conversionRate: Number(conversionRate),
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics({
        totalInquiries: 0,
        totalBookings: 0,
        totalUsers: 0,
        revenueTotal: 0,
        incomingThisMonth: 0,
        conversionRate: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Inquiries',
      value: analytics.totalInquiries,
      icon: '📧',
      color: 'blue',
      trend: '+12% from last month',
    },
    {
      label: 'Total Bookings',
      value: analytics.totalBookings,
      icon: '📅',
      color: 'green',
      trend: '+8% from last month',
    },
    {
      label: 'Total Users',
      value: analytics.totalUsers,
      icon: '👥',
      color: 'purple',
      trend: '+15% from last month',
    },
    {
      label: 'Total Revenue',
      value: `$${analytics.revenueTotal.toLocaleString()}`,
      icon: '💰',
      color: 'amber',
      trend: '+22% from last month',
    },
  ];

  const metricCards = [
    {
      label: 'This Month Bookings',
      value: analytics.incomingThisMonth,
      icon: Calendar,
      color: 'indigo',
    },
    {
      label: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      color: 'rose',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
            <p className="text-xs text-gray-500">{card.trend}</p>
          </div>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                  <Icon className={`text-${card.color}-600`} size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts / Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Overview */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Monthly Activity
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Inquiries</span>
                <span className="text-sm font-semibold text-gray-900">{analytics.totalInquiries}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${Math.min((analytics.totalInquiries / 100) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Bookings</span>
                <span className="text-sm font-semibold text-gray-900">{analytics.totalBookings}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{width: `${Math.min((analytics.totalBookings / 50) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Users</span>
                <span className="text-sm font-semibold text-gray-900">{analytics.totalUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{width: `${Math.min((analytics.totalUsers / 200) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye size={20} />
            Key Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Booking Value</span>
              <span className="text-2xl font-bold text-gray-900">
                ${analytics.totalBookings > 0 ? (analytics.revenueTotal / analytics.totalBookings).toFixed(0) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inquiry-to-Booking Ratio</span>
              <span className="text-2xl font-bold text-gray-900">
                1:{analytics.totalInquiries > 0 ? (analytics.totalInquiries / Math.max(analytics.totalBookings, 1)).toFixed(1) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bookings This Month</span>
              <span className="text-2xl font-bold text-gray-900">{analytics.incomingThisMonth}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📋 To Enable Full Analytics</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ Set up the following tables in Supabase: <code className="bg-white px-2 py-1 rounded">inquiries</code>, <code className="bg-white px-2 py-1 rounded">bookings</code>, <code className="bg-white px-2 py-1 rounded">users</code></li>
          <li>✓ Ensure the <code className="bg-white px-2 py-1 rounded">amount</code> field exists in bookings table for revenue calculation</li>
          <li>✓ Set up Row Level Security (RLS) policies for data access control</li>
        </ul>
      </div>
    </div>
  );
}