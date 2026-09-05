import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [googleMessage, setGoogleMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('google_error');
    if (error) setGoogleMessage(`Google sign-in failed: ${error}`);
    if (params.get('google') === 'success') setGoogleMessage('Google sign-in successful. Your account is connected.');
    if (error || params.get('google')) window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // placeholder — wire to auth backend when ready
    navigate('/');
  }

  function handleGoogleSignIn() {
    const apiUrl = (import.meta.env.VITE_API_URL || 'https://airavotoheadcli.onrender.com').replace(/\/$/, '');
    window.location.assign(`${apiUrl}/api/auth/google?returnTo=${encodeURIComponent(`${window.location.origin}/signup`)}`);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex min-h-screen items-center justify-center px-5 pt-[62px]">
        <div className="w-full max-w-md py-16">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Find and review gaming cafes across India
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border/70 bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2 active:scale-[0.98]"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-white text-[13px] font-bold leading-none text-[#4285F4]">G</span>
            Continue with Google
          </button>
          {googleMessage && (
            <p className="mt-3 text-center text-xs text-muted-foreground" role="status">{googleMessage}</p>
          )}

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border/60" />
            <span>or sign up with email</span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className="w-full rounded-xl border border-border/60 bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border/60 bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full rounded-xl border border-border/60 bg-surface px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-0 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
