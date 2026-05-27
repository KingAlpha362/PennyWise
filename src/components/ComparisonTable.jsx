import { motion } from "framer-motion";

const features = [
  { label: "AI financial assistant", penny: true, ynab: false, rocket: false, monarch: false },
  { label: "Automatic bank sync", penny: true, ynab: false, rocket: true, monarch: true },
  { label: "Subscription detection", penny: true, ynab: false, rocket: true, monarch: false },
  { label: "Net worth tracking", penny: true, ynab: false, rocket: true, monarch: true },
  { label: "Unlimited accounts", penny: true, ynab: true, rocket: true, monarch: true },
  { label: "Goal tracking", penny: true, ynab: true, rocket: false, monarch: true },
  { label: "Smart budget alerts", penny: true, ynab: true, rocket: true, monarch: true },
  { label: "Cashflow forecasting", penny: true, ynab: false, rocket: false, monarch: true },
  { label: "Investment tracking", penny: true, ynab: false, rocket: true, monarch: true },
  { label: "SOC 2 Type II certified", penny: true, ynab: false, rocket: false, monarch: false },
  { label: "Free tier available", penny: true, ynab: false, rocket: false, monarch: false },
  { label: "Monthly price (full plan)", penny: "$10", ynab: "$15", rocket: "$12", monarch: "$15" },
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 5 5L20 7" />
  </svg>
);

const Cross = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

function Cell({ value, isPenny }) {
  if (value === true) return <span className="flex justify-center"><Check /></span>;
  if (value === false) return <span className="flex justify-center"><Cross /></span>;
  return (
    <span className={`font-semibold text-sm ${isPenny ? "text-accent" : "text-text-muted"}`}>
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-bg py-24 px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-border text-xs font-bold px-3 py-1 rounded-full text-text-muted bg-card">
              How we compare
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-text">
            PennyWise vs the rest
          </h2>
          <p className="mt-4 text-text-muted max-w-md mx-auto">
            See exactly what you get — and what the others don't offer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-border shadow-md"
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-card border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-muted w-[38%]">Feature</th>
                <th className="px-4 py-4 text-center w-[16%] bg-accent/[0.07] border-x border-accent/15">
                  <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full border border-accent/20">
                    ✦ PennyWise
                  </span>
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-text-muted w-[15%]">YNAB</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-text-muted w-[15%]">Rocket Money</th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-text-muted w-[16%]">Monarch</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr
                  key={f.label}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-[var(--accent-dim)] ${i % 2 === 0 ? "bg-bg" : "bg-card"}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-text">{f.label}</td>
                  <td className="px-4 py-4 text-center bg-accent/[0.07] border-x border-accent/15">
                    <Cell value={f.penny} isPenny />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={f.ynab} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={f.rocket} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={f.monarch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-xs text-text-muted mt-5"
        >
          Prices as of May 2026. Comparison based on publicly available information.
        </motion.p>
      </div>
    </section>
  );
}
