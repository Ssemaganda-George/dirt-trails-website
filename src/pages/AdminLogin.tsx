import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, LogIn, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
  authError?: string | null;
}

export default function AdminLogin({ onLoginSuccess, authError }: AdminLoginProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('ssgeorge480@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error('Login failed. Please try again.');
      }

      toast({
        title: 'Signed in',
        description: 'Welcome back to the admin dashboard.',
      });

      onLoginSuccess?.();
    } catch (error: any) {
      const message = error?.message || 'Failed to sign in. Please check your credentials.';
      setLocalError(message);
      toast({
        title: 'Sign in failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <LogIn className="text-blue-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dirt Trails Admin</h1>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>

          {(authError || localError) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-4 text-sm text-red-700">
              {authError || localError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="h-12"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              ← Back to website
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Admin access is required to use this dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
