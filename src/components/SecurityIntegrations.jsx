import { Shield, Lock, Server } from 'lucide-react';
export default function SecurityIntegrations() {
  return (
    <section className="bg-bg py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">
            Bank-Level Security
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-text">
            Your data is protected by enterprise-grade security
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-full flex items-center justify-center mb-4 text-[var(--accent)]">
              <Lock size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">AES-256 Encryption</h3>
            <p className="text-sm text-text-muted">All your financial data is encrypted at rest and in transit using hardware-level cryptography.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-full flex items-center justify-center mb-4 text-[var(--accent)]">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">SOC 2 Type II Certified</h3>
            <p className="text-sm text-text-muted">We adhere to the strictest security frameworks to ensure your information is never compromised.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-full flex items-center justify-center mb-4 text-[var(--accent)]">
              <Server size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Read-Only Access</h3>
            <p className="text-sm text-text-muted">We use secure tokens to view your data. We never have access to your bank credentials or ability to move funds.</p>
          </div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Seamlessly Integrates With 10,000+ Financial Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock logos text for integrations */}
            <span className="text-2xl font-extrabold font-serif">CHASE</span>
            <span className="text-2xl font-extrabold tracking-tighter text-blue-600">citi</span>
            <span className="text-2xl font-extrabold italic text-red-600">Bank of America</span>
            <span className="text-2xl font-black text-green-700">TD</span>
            <span className="text-2xl font-extrabold tracking-widest">CAPITAL ONE</span>
            <span className="text-xl font-bold bg-black text-white px-3 py-1 rounded-sm">Plaid</span>
          </div>
        </div>
      </div>
    </section>
  );
}
