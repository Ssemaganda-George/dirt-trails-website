import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface Inquiry {
  id: string;
  created_at: string;
  business_type?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  country?: string;
  phone?: string;
  website?: string;
  interest?: string;
  message?: string;
  status?: 'new' | 'read' | 'responded';
  [key: string]: any;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      // Try to fetch from Supabase table first
      const { data, error } = await supabase
        .from('website_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error && error.code === 'PGRST116') {
        // Table doesn't exist yet - this is expected in early setup
        console.log('Inquiries table not yet created. Set up Supabase tables first.');
        setInquiries([]);
      } else if (error) {
        console.error('Error fetching inquiries:', error);
      } else {
        setInquiries(data || []);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this inquiry?');
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('website_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setInquiries((current) => current.filter((i) => i.id !== id));
      toast({
        title: 'Inquiry deleted',
        description: 'The inquiry was successfully removed.',
      });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: 'Delete failed',
        description: 'Unable to delete the inquiry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleMarkAsRead = async (inquiry: Inquiry) => {
    try {
      const { error } = await supabase
        .from('website_inquiries')
        .update({ status: 'read' })
        .eq('id', inquiry.id);

      if (error) throw error;
      setInquiries(inquiries.map(i => 
        i.id === inquiry.id ? { ...i, status: 'read' } : i
      ));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const interestOptions = Array.from(
    new Set(inquiries.map((inquiry) => (inquiry.interest?.trim() || 'General')).filter(Boolean))
  );

  const filteredInquiries = inquiries.filter((inquiry) => {
    const fullName = `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim();
    const inquiryInterest = inquiry.interest?.trim() || 'General';
    const matchesInterest = selectedInterest === 'all' || inquiryInterest === selectedInterest;

    return (
      matchesInterest &&
      (
        inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.interest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.business_type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            placeholder="Search by email, name, subject, or interest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="interest-filter" className="sr-only">
            Filter by interest
          </label>
          <select
            id="interest-filter"
            value={selectedInterest}
            onChange={(e) => setSelectedInterest(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
          >
            <option value="all">All interests</option>
            {interestOptions.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <Button onClick={fetchInquiries} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            <p>No inquiries found</p>
            <p className="text-sm mt-2">Set up the inquiries table in Supabase to start tracking inquiries.</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border ${
                inquiry.status === 'new' ? 'border-red-100' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className={`text-lg font-semibold ${inquiry.status === 'new' ? 'text-red-700' : 'text-slate-950'}`}>
                        {`${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim() || inquiry.email || 'Unknown'}
                      </h3>
                      <p className="text-sm text-slate-600">{inquiry.company_name || 'No company provided'}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      inquiry.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {inquiry.status?.toUpperCase() || 'NEW'}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
                      <p className="mt-1 text-sm text-slate-900">{inquiry.email}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Interest</p>
                      <p className="mt-1 text-sm text-slate-900">{inquiry.interest || 'General'}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Business Type</p>
                      <p className="mt-1 text-sm text-slate-900">{inquiry.business_type || 'N/A'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Country</p>
                      <p className="mt-1 text-sm text-slate-900">{inquiry.country || 'N/A'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Submitted</p>
                      <p className="mt-1 text-sm text-slate-900">
                        {new Date(inquiry.created_at).toLocaleDateString()} • {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:w-44">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      setShowDetails(true);
                      handleMarkAsRead(inquiry);
                    }}
                  >
                    <Eye size={16} className="mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedInquiry.subject || 'Inquiry Details'}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Name</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{`${selectedInquiry.first_name || ''} ${selectedInquiry.last_name || ''}`.trim() || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Company</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.company_name || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Email</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.email || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Business Type</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.business_type || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Country</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.country || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Phone</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Website</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.website || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Interest</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.interest || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Message</p>
                  <p className="mt-2 text-sm text-slate-900 whitespace-pre-wrap">{selectedInquiry.message || 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2 grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Received</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {new Date(selectedInquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Status</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{selectedInquiry.status || 'new'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => window.location.href = `mailto:${selectedInquiry.email}`}
                  className="flex-1"
                >
                  Reply via Email
                </Button>
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}