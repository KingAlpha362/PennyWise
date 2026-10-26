import { useState, useMemo, useId } from "react";
import { motion } from "framer-motion";

import { calculateSavings } from '../lib/savings';

function Slider({ label, value, min, max, step, prefix, onChange }) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm font-medium text-text">{label}</label>
        <span className="text-sm font-bold text-accent">
          {prefix}{value.toLocaleString()}
        </span>
      </div>
      <div className="relative h-8 rounded-full bg-border">
        <div
          className="absolute left-0 top-3 h-2 rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="roi-slider absolute inset-0 w-full opacity-0 focus-visible:opacity-100 cursor-pointer h-full"
        />
      </div>
      <div className="flex justify-between text-[0.7rem] text-text-muted">
        <span>{prefix}{min.toLocaleString()}</span>
        <span>{prefix}{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function ROICalculator({ onGetStarted }) {
  const [dining, setDining] = useState(600);
  const [subscriptions, setSubscriptions] = useState(180);
  const [shopping, setShopping] = useState(500);

  const result = useMemo(() => calculateSavings(dining, subscriptions, shopping), [dining, subscriptions, shopping]);

  return (
    <section className="bg-bg py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">
              ROI Calculator
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-text">
            Explore a savings scenario
          </h2>
          <p className="mt-4 text-text-muted max-w-md mx-auto">
            Adjust sample spending to explore an illustrative savings scenario.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          {/* Input Panel */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-text">Your monthly spending</h3>
            <Slider
              label="Dining & takeout"
              value={dining}
              min={0}
              max={2000}
              step={50}
              prefix="$"
              onChange={setDining}
            />
            <Slider
              label="Subscriptions"
              value={subscriptions}
              min={0}
              max={600}
              step={10}
              prefix="$"
              onChange={setSubscriptions}
            />
            <Slider
              label="Shopping & retail"
              value={shopping}
              min={0}
              max={2000}
              step={50}
              prefix="$"
              onChange={setShopping}
            />
          </div>

          {/* Result Panel */}
          <div className="space-y-4">
            <div className="bg-accent/[0.06] border border-accent/20 rounded-2xl p-6">
              <p className="text-sm text-text-muted mb-1">Illustrative monthly savings</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-accent tabular-nums">
                  ${result.total.toLocaleString()}
                </span>
                <span className="text-text-muted text-sm">/month</span>
              </div>
              <p className="text-sm text-text-muted mt-1">
                Illustratively, that is <strong className="text-text">${result.annualSavings.toLocaleString()}/year</strong> in this scenario.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Where it comes from</h4>
              <div className="space-y-3">
                <SavingsRow
                  label="Dining overspend reduction"
                  amount={result.diningOverspend}
                  description="Assumes a 22% reduction"
                />
                <SavingsRow
                  label="Unused subscription cancels"
                  amount={result.subsSavings}
                  description="Assumes a 38% reduction"
                />
                <SavingsRow
                  label="Shopping habit optimization"
                  amount={result.shoppingSavings}
                  description="Assumes an 18% reduction"
                />
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-text">Total monthly savings</span>
                <span className="text-sm font-bold text-accent">${result.total}/mo</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl px-5 py-4 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text">Proposed Pro price: $10/mo</p>
                <p className="text-xs text-text-muted mt-0.5">No subscription is created in the demo.</p>
              </div>
              <button onClick={onGetStarted} className="ed-button ed-button-primary text-sm py-2 px-4 whitespace-nowrap">
                Explore demo
              </button>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-xs text-text-muted mt-8"
        >
          Illustrative only: 22% of dining, 38% of subscriptions, and 18% of shopping, rounded per category. Annual total is monthly × 12. These assumptions are not measured results or a savings guarantee.
        </motion.p>
      </div>
    </section>
  );
}

function SavingsRow({ label, amount, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5L20 7" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-text">{label}</span>
          <span className="text-sm font-bold text-accent flex-shrink-0">+${amount}</span>
        </div>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
    </div>
  );
}
