import { motion } from 'framer-motion';
import { Link2, Sparkles, TrendingUp } from 'lucide-react';
import OrbitingAccounts from './ui/orbiting-accounts';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Link2 size={22} />,
      title: 'Link your accounts',
      desc: 'Securely connect your banks, credit cards, and investment accounts in seconds using our Plaid integration.',
      color: 'bg-blue-500/10 text-blue-500',
      num: '01',
    },
    {
      icon: <Sparkles size={22} />,
      title: 'Let AI analyze',
      desc: 'Our machine learning models categorize your spending, identify subscriptions, and find savings opportunities automatically.',
      color: 'bg-[#16A34A]/10 text-[#16A34A]',
      num: '02',
    },
    {
      icon: <TrendingUp size={22} />,
      title: 'Build wealth',
      desc: 'Follow predictive allocation routines to crush debt, hit savings goals, and grow your net worth.',
      color: 'bg-[#c9922a]/10 text-[#c9922a]',
      num: '03',
    }
  ];

  return (
    <section className="bg-bg py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          {/* Left: headline */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text leading-tight tracking-tight mb-4">
              Three steps to<br />financial clarity
            </h2>
            <p className="text-text-muted text-[1rem] leading-[1.7] max-w-sm">
              Completely simplified wealth building. Set it up once and let the system do the heavy lifting.
            </p>
          </div>

          {/* Right: steps stacked vertically */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-border ${step.color} bg-card`}>
                  {step.icon}
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-[0.62rem] font-bold tracking-[0.16em] text-text-muted uppercase">{step.num}</span>
                    <h3 className="text-[1rem] font-bold text-text">{step.title}</h3>
                  </div>
                  <p className="text-text-muted text-[0.87rem] leading-[1.65]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="pt-10 border-t border-border"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-text">All your assets. One ecosystem.</h3>
            <p className="text-text-muted mt-2 text-[0.9rem]">PennyWise continuously syncs with your institutions.</p>
          </div>
          <OrbitingAccounts />
        </motion.div>
      </div>
    </section>
  );
}
