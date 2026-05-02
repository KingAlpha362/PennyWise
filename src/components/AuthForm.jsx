import React, { useState } from 'react';
import { ArrowLeft, Mail, KeyRound, Eye, EyeOff } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({ initialMode = 'signin', onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    // Simulated success execution
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-bg flex font-sans text-text transition-colors relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#16A34A]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#c9922a]/5 blur-[120px] pointer-events-none" />

      {/* Main Interactive Form */}
      <div className="w-full flex items-center justify-center p-8 md:p-16 relative z-10">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-text-muted hover:text-text transition-all font-bold cursor-pointer z-20"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <Card className="w-full max-w-md mx-auto bg-card border-border shadow-xl">
          <CardHeader className="text-left space-y-2">
            <CardTitle className="text-2xl font-extrabold text-text">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-text-muted font-medium">
              {mode === 'signin'
                ? 'Login to your personal financial command center.'
                : 'Complete parameters to trigger portfolio deployments.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-xs font-medium bg-red-900/10 border border-red-500/20 text-red-500 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Social Sign-in */}
              <div className="space-y-2">
                <Label className="text-xs text-text-muted font-bold">Sign in with</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onAuthSuccess()}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => onAuthSuccess()}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.48 11.23c-.04-2.82 2.31-4.18 2.42-4.25-1.31-1.92-3.34-2.18-4.06-2.22-1.74-.18-3.38 1.03-4.28 1.03-.89 0-2.28-1-3.72-.98-1.92.03-3.68 1.12-4.68 2.86-2.02 3.51-.52 8.7 1.45 11.55.96 1.4 2.11 2.97 3.63 2.91 1.45-.06 2-.95 3.75-.95 1.74 0 2.25.95 3.78.92 1.57-.03 2.57-1.42 3.52-2.82 1.1-1.61 1.55-3.17 1.57-3.25-.03-.01-3.03-1.16-3.08-4.8zm-2.45-6.66c.8-1 1.34-2.38 1.19-3.77-1.19.05-2.64.8-3.48 1.8-.74.88-1.37 2.29-1.19 3.66 1.33.1 2.68-.69 3.48-1.69z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-text-muted font-bold">or</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text font-bold">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="James Doe"
                        className="bg-bg border-border text-text placeholder-text-muted/50 focus-visible:border-[#16A34A] focus-visible:ring-[#16A34A]/20"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text font-bold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="pl-9 bg-bg border-border text-text placeholder-text-muted/50 focus-visible:border-[#16A34A] focus-visible:ring-[#16A34A]/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-text font-bold">Password</Label>
                    {mode === 'signin' && (
                      <a href="#" className="text-xs font-bold text-[#c9922a] hover:underline">Forgot password?</a>
                    )}
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-10 bg-bg border-border text-text placeholder-text-muted/50 focus-visible:border-[#16A34A] focus-visible:ring-[#16A34A]/20"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            </div>
          </CardContent>

          <CardFooter className="flex-col items-center space-y-4 pt-4 border-t border-border">
            <button
              onClick={() => {
                setError('');
                setMode(mode === 'signin' ? 'signup' : 'signin');
              }}
              className="text-xs text-[#c9922a] hover:underline font-bold transition-all"
            >
              {mode === 'signin'
                ? "Don't have an account? Create one free"
                : 'Already a member? Log in instead'}
            </button>

            <p className="text-[10px] text-text-muted text-center w-full max-w-[250px] font-medium leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-text">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-text">Privacy Policy</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
