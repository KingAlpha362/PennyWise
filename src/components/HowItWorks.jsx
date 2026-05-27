import { motion } from 'framer-motion';
import { Link2, Sparkles, TrendingUp } from 'lucide-react';
import OrbitingAccounts from './ui/orbiting-accounts';

const steps = [
  {
    icon: Link2,
    num: '01',
    title: 'Link your accounts',
    desc: 'Securely connect your banks, credit cards, and investment accounts in seconds using our Plaid integration.',
    delay: 0.1,
  },
  {
    icon: Sparkles,
    num: '02',
    title: 'Let AI analyze',
    desc: 'Our machine learning models categorize your spending, identify subscriptions, and find savings opportunities.',
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    num: '03',
    title: 'Build wealth',
    desc: 'Follow the predictive allocation routines to crush debt, hit savings goals, and grow your net worth automatically.',
    delay: 0.3,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[var(--bg-subtle)] py-24 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: step.delay, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden"
              >
                {/* watermark step number */}
                <span
                  aria-hidden
                  className="absolute -top-3 -right-1 text-[6rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'color-mix(in srgb, var(--text) 5%, transparent)' }}
                >
                  {step.num}
                </span>

                <div className="relative z-10 w-10 h-10 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center shrink-0">
                  <Icon size={19} strokeWidth={1.5} className="text-[var(--accent)]" aria-hidden />
                </div>

                <div className="relative z-10 flex flex-col gap-1.5">
                  <span className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[var(--accent)]">
                    Step {step.num}
                  </span>
                  <h3 className="font-semibold text-[1rem] tracking-[-0.02em] text-text leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[0.83rem] text-text-muted leading-[1.65]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
