import { motion } from 'framer-motion';
import { Link2, Sparkles, TrendingUp } from 'lucide-react';
import OrbitingAccounts from './ui/orbiting-accounts';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Link2 size={32} />,
      title: "1. Link your accounts",
      desc: "Securely connect your banks, credit cards, and investment accounts in seconds using our Plaid integration.",
      color: "bg-[var(--accent-dim)] text-[var(--accent)]",
      delay: 0.1
    },
    {
      icon: <Sparkles size={32} />,
      title: "2. Let AI analyze",
      desc: "Our machine learning models categorize your spending, identify subscriptions, and find savings opportunities.",
      color: "bg-[var(--accent-dim)] text-[var(--accent)]",
      delay: 0.2
    },
    {
      icon: <TrendingUp size={32} />,
      title: "3. Build wealth",
      desc: "Follow the predictive allocation routines to crush debt, hit savings goals, and grow your net worth automatically.",
      color: "bg-[var(--accent-dim)] text-[var(--accent)]",
      delay: 0.3
    }
  ];

  return (
    <section className="bg-bg py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">
              How It Works
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text">
            Three steps to financial clarity
          </h2>
          <p className="text-text-muted text-lg">
            We've completely simplified the wealth building process. Set it up once, and let the system do the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-border -z-10 -translate-y-12"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step.delay }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-bg ${step.color} bg-card shadow-xl`}>
                {step.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text">{step.title}</h3>
                <p className="text-text-muted max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-border"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-text">All your assets. One ecosystem.</h3>
            <p className="text-text-muted mt-2">PennyWise continuously syncs with your institutions.</p>
          </div>
          <OrbitingAccounts />
        </motion.div>
      </div>
    </section>
  );
}
