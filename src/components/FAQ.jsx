import { useId, useState } from 'react';
const questions = [
  ['Do I need an account?', 'No. Open the demo dashboard directly. Do not enter personal or banking information.'],
  ['Can I connect my bank or move money?', 'No. All accounts and financial data are fictional. Bank connections, payments, and transfers are not implemented.'],
  ['What can I try?', 'Explore transactions, add a sample transaction, create a sample budget or goal, record a sample goal contribution, and switch dashboard themes. Some controls are explicitly marked as previews.'],
  ['Will my changes be saved?', 'Changes remain in this dashboard session. Leaving the dashboard or refreshing resets the sample data. No account is created.'],
  ['Is the assistant a live AI service?', 'No. Penny uses local response rules with demo data. Its responses are illustrative, not personalized financial advice.'],
  ['What do the prices mean?', 'The proposed Starter price is $0. Pro is $10 per month or $100 per year in USD. The demo is free and does not start a subscription or trial.'],
  ['Are the calculator results guaranteed?', 'No. The calculator applies visible illustrative percentage assumptions to sample spending. It does not predict actual savings.'],
];
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <div className="border-b border-border py-4"><h3><button className="w-full text-left font-semibold text-text" aria-expanded={open} aria-controls={id} onClick={() => setOpen(v => !v)}>{question} <span aria-hidden="true">{open ? '−' : '+'}</span></button></h3><p id={id} hidden={!open} className="text-text-muted mt-3">{answer}</p></div>;
}
export default function FAQ() {
  return <section id="faq" className="bg-bg px-6 py-20"><div className="max-w-3xl mx-auto"><h2 className="text-3xl text-text font-bold mb-8">Questions about the demo</h2>{questions.map(([question, answer]) => <FAQItem key={question} question={question} answer={answer} />)}</div></section>;
}
