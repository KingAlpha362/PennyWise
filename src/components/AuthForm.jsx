import React, { useState } from 'react';
import { ArrowLeft, Shield, Sparkles, CheckCircle } from 'lucide-react';

export default function AuthForm({ initialMode = 'signin', onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-[#111814] flex font-sans text-[#f0ece0]">
      
      {/* Left Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0d120f] border-r border-[#1e2b20] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[#16A34A]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-[#c9922a]/5 blur-[120px] pointer-events-none" />

        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-sm text-[#8aa890] hover:text-white transition-all z-10"
        >
          <ArrowLeft size={16} /> Back to main site
        </button>

        <div className="relative z-10 max-w-md">
          <span className="text-2xl font-bold text-[#16A34A]">Penny<span className="text-[#c9922a]">Wise</span></span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-6 leading-tight">
            {mode === 'signin' 
              ? 'Secure automated financial analytics.' 
              : 'Build generational wealth effortlessly.'}
          </h2>
          <p className="text-sm text-[#8aa890] mt-4 leading-relaxed">
            Your credentials are encrypted end-to-end under strict operational benchmarks.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 bg-[#131f15] border border-[#1e2b20] p-4 rounded-2xl">
              <CheckCircle className="text-[#16A34A] flex-shrink-0" size={20} />
              <p className="text-xs text-[#f0ece0]">Live cross-account balance mapping</p>
            </div>
            <div className="flex items-center gap-3 bg-[#131f15] border border-[#1e2b20] p-4 rounded-2xl">
              <Shield className="text-[#16A34A] flex-shrink-0" size={20} />
              <p className="text-xs text-[#f0ece0]">AES-256 hardware level encryption schemas</p>
            </div>
            <div className="flex items-center gap-3 bg-[#131f15] border border-[#1e2b20] p-4 rounded-2xl">
              <Sparkles className="text-[#c9922a] flex-shrink-0" size={20} />
              <p className="text-xs text-[#f0ece0]">Real-time LLM predictive allocation routines</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6a8a72] z-10">
          © 2026 PennyWise Operations. All protocols verified.
        </p>
      </div>

      {/* Right Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
        <button 
          onClick={onBack} 
          className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-xs text-[#8aa890] hover:text-white transition-all"
        >
          <ArrowLeft size={14} /> Exit
        </button>

        <div className="w-full max-w-sm space-y-8">
          <div>
            <h3 className="text-2xl font-bold">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-xs text-[#8aa890] mt-2">
              {mode === 'signin' 
                ? 'Login to your personal financial command center.' 
                : 'Complete parameters to trigger portfolio deployments.'}
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs font-medium bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold text-[#8aa890] block mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="James Doe"
                  className="w-full p-3.5 bg-[#131f15] border border-[#1e2b20] text-[#f0ece0] placeholder-[#6a8a72] text-sm rounded-xl outline-none focus:border-[#16A34A] transition-all shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#8aa890] block mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3.5 bg-[#131f15] border border-[#1e2b20] text-[#f0ece0] placeholder-[#6a8a72] text-sm rounded-xl outline-none focus:border-[#16A34A] transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#8aa890] block mb-1.5">Secure Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 bg-[#131f15] border border-[#1e2b20] text-[#f0ece0] placeholder-[#6a8a72] text-sm rounded-xl outline-none focus:border-[#16A34A] transition-all shadow-sm"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#16A34A] hover:bg-[#15803D] text-[#111814] font-bold text-sm rounded-xl shadow-lg shadow-[#16A34A]/10 transition-all active:scale-[0.98] mt-2"
            >
              {mode === 'signin' ? 'Sign In' : 'Launch Dashboard'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => {
                setError('');
                setMode(mode === 'signin' ? 'signup' : 'signin');
              }} 
              className="text-xs text-[#c9922a] hover:underline font-medium transition-all"
            >
              {mode === 'signin' 
                ? "Don't have an account? Create one free" 
                : 'Already a member? Log in instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
