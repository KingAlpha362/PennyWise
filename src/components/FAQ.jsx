import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Getting started",
    items: [
      {
        q: "How does PennyWise connect to my bank?",
        a: "PennyWise uses Plaid, the same infrastructure trusted by Venmo, Robinhood, and thousands of other financial apps. The connection is read-only — we can see your transactions but can never move money. Setup takes about 2 minutes.",
      },
      {
        q: "Which banks and accounts are supported?",
        a: "We support 12,000+ financial institutions in the US, including all major banks (Chase, Bank of America, Wells Fargo, Citi), credit unions, investment accounts, credit cards, and loans. If your bank supports online banking, it almost certainly works with PennyWise.",
      },
      {
        q: "How long does it take to set up?",
        a: "Most users are fully set up in under 2 minutes. Connect your accounts, and Penny AI immediately starts analyzing your transaction history — no manual categorization, no spreadsheets. You'll see your first insights within seconds.",
      },
      {
        q: "Can I use PennyWise if I have multiple accounts or businesses?",
        a: "Yes — Pro users can connect unlimited accounts. Many of our users manage 5–10 accounts across personal and business finances. You'll see a unified dashboard with everything in one place, and can filter by account at any time.",
      },
    ],
  },
  {
    category: "Security & privacy",
    items: [
      {
        q: "Is my financial data safe?",
        a: "We take security extremely seriously. PennyWise is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Our bank connections are read-only — we cannot initiate transfers or access account credentials.",
      },
      {
        q: "Does PennyWise sell my data?",
        a: "No. We never sell, rent, or share your personal financial data with third parties for advertising or marketing purposes. Our business model is a straightforward subscription — your data is yours.",
      },
      {
        q: "Can PennyWise move money or make payments?",
        a: "No. Our bank connections are strictly read-only. PennyWise can see your balances and transaction history, but it cannot initiate transfers, make payments, or modify anything in your accounts. This is enforced at the API level by Plaid.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "If you cancel your account, you can request a full export of your data. After 30 days, all your personal data is permanently deleted from our servers. We retain only anonymized, aggregated statistics that cannot be linked back to you.",
      },
    ],
  },
  {
    category: "Pricing & features",
    items: [
      {
        q: "What's included in the free Starter plan?",
        a: "The Starter plan is genuinely useful: up to 2 connected accounts, basic budget tracking, transaction history, and standard bank-level encryption. It's great for individuals just getting started. For AI-powered insights, unlimited accounts, and subscription detection, you'll want Pro.",
      },
      {
        q: "What does the 7-day free trial include?",
        a: "The free trial gives you full access to all Pro features — unlimited accounts, Penny AI assistant, subscription detection, smart alerts, and priority support — for 7 days. No credit card required to start. If you upgrade, you're billed at the end of the trial period.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes, cancel any time with no questions asked and no penalties. If you cancel mid-billing period, you keep access until the end of the period you paid for. We don't offer partial-month refunds, but we do offer a full refund within 7 days of your first charge if you're not satisfied.",
      },
      {
        q: "Is there a discount for annual billing?",
        a: "Yes — annual billing saves you $20/year (equivalent to 2 months free). At $100/year vs $120 billed monthly, it's the best value. Given that the average PennyWise user saves $1,872/year in hidden expenses, the plan pays for itself many times over.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="faq-trigger w-full text-left py-5 flex items-start justify-between gap-4 cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-text leading-snug">{q}</span>
        <span className="flex-shrink-0 mt-0.5 transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="faq-body text-sm text-text-muted leading-relaxed pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="bg-bg py-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">FAQ</div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-text">
            Questions & answers
          </h2>
          <p className="mt-4 text-text-muted max-w-sm mx-auto">
            Everything you need to know before you start.
          </p>
        </motion.div>

        <div className="space-y-10">
          {faqs.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: si * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-1 px-0">
                {section.category}
              </h3>
              <div className="bg-card border border-border rounded-2xl px-6 divide-y divide-border">
                {section.items.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-card border border-border rounded-2xl px-8 py-8"
        >
          <p className="text-sm font-semibold text-text mb-1">Still have questions?</p>
          <p className="text-sm text-text-muted mb-4">Our team typically replies within a few hours.</p>
          <a
            href="mailto:support@pennywise.app"
            className="btn-secondary inline-flex items-center gap-2 text-sm py-2.5 px-5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Contact support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
