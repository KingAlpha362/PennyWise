import { Shield, Lock, Server } from 'lucide-react';

export default function SecurityIntegrations() {
  const features = [
    {
      icon: <Lock size={18} />,
      title: 'AES-256 Encryption',
      desc: 'All financial data encrypted at rest and in transit using hardware-level cryptography.',
      color: 'text-[#16A34A] bg-[#16A34A]/10',
    },
    {
      icon: <Shield size={18} />,
      title: 'SOC 2 Type II Certified',
      desc: 'Independently audited against the strictest security frameworks. Your data is never compromised.',
      color: 'text-[#c9922a] bg-[#c9922a]/10',
    },
    {
      icon: <Server size={18} />,
      title: 'Read-Only Access',
      desc: 'Secure tokens to view your data only. We never hold credentials or move funds.',
      color: 'text-blue-500 bg-blue-500/10',
    },
  ];

  return (
    <section className="bg-bg py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-text leading-tight tracking-tight mb-4">
              Enterprise-grade security,<br />
              <span className="text-[#16A34A]">built in from day one.</span>
            </h2>
            <p className="text-text-muted text-[0.95rem] leading-[1.7] mb-8 max-w-md">
              We protect your financial data with the same standards used by major banks. Accounts connect securely via Plaid's read-only API - we can see your data, never touch it.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {['SOC 2 Certified', 'GDPR Compliant', '256-bit SSL', 'CCPA Ready'].map((badge) => (
                <span
                  key={badge}
                  className="text-[0.72rem] font-semibold text-text-muted border border-border rounded-full px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Institution logos */}
            <div>
              <p className="text-[0.68rem] font-bold text-text-muted uppercase tracking-[0.18em] mb-4">
                Connects with 10,000+ institutions
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-60">
                <span className="font-extrabold font-serif text-lg text-text tracking-tight">CHASE</span>
                <span className="font-extrabold text-lg text-blue-500 tracking-tighter">citi</span>
                <span className="font-bold italic text-lg text-red-600">BofA</span>
                <span className="font-black text-lg text-green-700">TD</span>
                <span className="font-extrabold text-lg text-text tracking-widest uppercase text-sm">Capital One</span>
                <span className="font-bold bg-black text-white px-2.5 py-0.5 rounded-sm text-sm">Plaid</span>
              </div>
            </div>
          </div>

          {/* Right: stacked security features */}
          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-[#16A34A]/30 transition-colors duration-200"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[0.95rem] font-bold text-text mb-1">{f.title}</h3>
                  <p className="text-[0.82rem] text-text-muted leading-[1.6]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
