import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Header } from './ui/header-2';
import Pricing from './Pricing';
import ROICalculator from './ROICalculator';
import './editorial-landing.css';

const tourSteps = [
  { id: 'transactions', title: 'Find the everyday picture.', short: 'Your spending', description: 'A coffee, a grocery run, a monthly bill. Bring the small details into focus with searchable, categorized sample transactions.', detail: 'Search and filter transactions in the demo.', caption: 'Transaction view · Fictional November activity' },
  { id: 'budgets', title: 'Give each month a little direction.', short: 'Your plan', description: 'Set a limit that makes sense, then see where spending stands. Create a sample budget and watch the totals update as you add transactions.', detail: 'Create a budget and try a sample transaction.', caption: 'Budget view · Illustrative monthly limits' },
  { id: 'goals', title: 'Keep something good in sight.', short: 'Your next chapter', description: 'A place of your own. A little more breathing room. A trip you keep talking about. Create a sample goal and follow its progress, one contribution at a time.', detail: 'Create a goal and record a fictional contribution.', caption: 'Goal view · Sample savings progress' },
];
const transactions = [
  { initials: 'WF', merchant: 'Whole Foods Market', category: 'Groceries', amount: '−$84.32', day: 'Today' },
  { initials: 'BC', merchant: 'Blue Bottle Coffee', category: 'Dining', amount: '−$6.75', day: 'Today' },
  { initials: 'AL', merchant: 'Acme Labs', category: 'Income', amount: '+$4,240.00', day: 'Yesterday', positive: true },
  { initials: 'TJ', merchant: 'Trader Joe’s', category: 'Groceries', amount: '−$67.18', day: 'Sunday' },
];
function TransactionScene() {
  return <div className="ed-transactions">
    <div className="ed-scene-title"><div><span className="ed-muted">November 2025</span><h3>Money in motion.</h3></div><span className="ed-scene-pill">Sample activity</span></div>
    <div className="ed-ledger-summary"><div><span>Income</span><strong>$8,480</strong></div><div><span>Spending</span><strong>$5,677</strong></div></div>
    <div className="ed-ledger-head"><span>Transaction</span><span>Amount</span></div>
    {transactions.map(t => <div key={t.merchant} className="ed-ledger-row"><span className="ed-merchant-mark" aria-hidden="true">{t.initials}</span><div><strong>{t.merchant}</strong><small>{t.category} · {t.day}</small></div><span className={t.positive ? 'ed-positive' : ''}>{t.amount}</span></div>)}
    <p className="ed-scene-footnote">A few sample entries from the demo dashboard.</p>
  </div>;
}
function BudgetScene() {
  return <div className="ed-budget-scene"><div className="ed-scene-title"><div><span className="ed-muted">November 2025</span><h3>A plan with perspective.</h3></div><span className="ed-scene-pill">Sample budgets</span></div>
    <div className="ed-budget-total"><span>Across these three categories</span><strong>$207 <small>left to plan with</small></strong></div>
    {[{name:'Groceries',spent:529,limit:700},{name:'Dining',spent:203,limit:350},{name:'Shopping',spent:411,limit:300}].map(b => <div className="ed-budget-row" key={b.name}><div><strong>{b.name}</strong><span>${b.spent} / ${b.limit}</span></div><div className="ed-meter" role="meter" aria-label={b.name + ' budget used'} aria-valuemin={0} aria-valuemax={b.limit} aria-valuenow={Math.min(b.spent,b.limit)} aria-valuetext={'$'+b.spent+' spent of $'+b.limit}><span className={b.spent>b.limit?'ed-over':''} style={{width:Math.min(100,b.spent/b.limit*100)+'%'}} /></div><small>{b.spent>b.limit?'$'+(b.spent-b.limit)+' over the sample limit':'$'+(b.limit-b.spent)+' remaining'}</small></div>)}
  </div>;
}
function GoalScene() {
  return <div className="ed-goal-scene"><div className="ed-scene-title"><div><span className="ed-muted">A little closer, each week</span><h3>Tokyo, someday soon.</h3></div><span className="ed-scene-pill">Sample goal</span></div>
    <div className="ed-goal-illustration" aria-hidden="true"><svg viewBox="0 0 400 140" fill="none"><path d="M0 116h400M35 115V91h28v24M75 115V69h37v46M291 115V63h27v52M332 115V88h31v27" stroke="currentColor"/><path d="M158 115l42-100 42 100M174 79h52M182 59h36M165 99h70M188 115l12-26 12 26" stroke="currentColor" strokeWidth="2"/><path d="M123 115V85h25v30M252 115V95h26v20" stroke="currentColor"/><circle cx="284" cy="29" r="16" fill="currentColor" opacity=".12"/></svg></div>
    <div className="ed-goal-amount"><strong>$4,180</strong><span>of $6,500</span></div><div className="ed-meter" role="meter" aria-label="Tokyo sample savings goal" aria-valuemin={0} aria-valuemax={6500} aria-valuenow={4180}><span style={{width:'64.3%'}} /></div>
    <div className="ed-goal-meta"><span>64% of the way there</span><span>$350 / week, illustrated</span></div>
  </div>;
}
function MonthlyStatement() {
  return <figure className="ed-statement"><div className="ed-statement-top"><span>PennyWise</span><span>November, in view</span></div>
    <div className="ed-statement-body"><div className="ed-statement-label">A little more clarity.</div><div className="ed-statement-value">$2,803<span>left after sample spending</span></div>
      <div className="ed-statement-chart" role="img" aria-label="Illustrative monthly income of $8,480, spending of $5,677, and remainder of $2,803"><svg viewBox="0 0 440 125" aria-hidden="true"><path d="M0 102H440M0 62H440M0 22H440" stroke="currentColor" opacity=".1"/><path d="M0 107C26 107 23 93 55 93S87 95 110 83S135 81 161 68S196 69 220 52S256 55 280 40S309 41 340 29S392 28 440 9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M0 107C26 107 23 93 55 93S87 95 110 83S135 81 161 68S196 69 220 52S256 55 280 40S309 41 340 29S392 28 440 9V125H0Z" fill="currentColor" opacity=".04"/></svg><div><span>Nov 1</span><span>Nov 25</span></div></div>
      <div className="ed-statement-breakdown"><div><span>Money in</span><strong>$8,480</strong></div><div><span>Money out</span><strong>$5,677</strong></div><div><span>Your next step</span><strong>A little intention.</strong></div></div>
    </div><figcaption><span className="ed-status-dot"/>Product illustration · Fictional financial data</figcaption>
  </figure>;
}
const questions = [
  ['Do I need to connect a bank?', 'No. Explore the demo with fictional accounts and transactions. No bank credentials or personal information are required.'],
  ['What can I try in the demo?', 'Search transactions, add a sample expense, create a budget or goal, record a fictional goal contribution, and switch dashboard themes.'],
  ['Are my changes saved?', 'Changes stay in the current dashboard session and reset when you leave or reload. No real account is created.'],
  ['Is Penny a live AI service?', 'Penny uses local response rules and sample data. Responses illustrate the product concept and are not personalized financial advice.'],
  ['Will I be charged?', 'No. Pricing is proposed and shown in USD. Exploring the demo does not start a trial, checkout, or subscription.'],
];
export default function EditorialLanding({onGetStarted,onSignIn,theme,onToggleTheme}) {
  const [step,setStep] = useState(0);
  const current = tourSteps[step];
  return <div className="editorial" data-landing-theme={theme}>
    <Header onGetStarted={onGetStarted} onSignIn={onSignIn} theme={theme} onToggleTheme={onToggleTheme}/>
    <section id="home" className="ed-hero ed-shell"><div className="ed-hero-copy"><p className="ed-intro">A considered approach to personal finance.</p><h1>Make room for<br/>what matters.</h1><p className="ed-hero-description">See your spending, plan your next month, and follow your savings goals. A clearer picture makes space for the life behind the numbers.</p><div className="ed-hero-actions"><button className="ed-button ed-button-primary" onClick={onGetStarted}>Explore the demo <ArrowUpRight size={17} aria-hidden="true"/></button><a className="ed-text-link" href="#features">Take a closer look <ArrowRight size={16} aria-hidden="true"/></a></div><p className="ed-demo-caption">Sample data. No account or bank connection needed.</p></div><MonthlyStatement/></section>
    <div className="ed-principles ed-shell" aria-label="Product focus"><span>A view of the everyday.</span><span>A plan for the month.</span><span>A little room for tomorrow.</span></div>
    <section id="features" className="ed-tour ed-shell"><div className="ed-section-heading"><p className="ed-intro">The product, up close</p><h2>From a transaction<br/>to a plan.</h2><p>Good decisions begin with a clear picture. Explore three parts of the PennyWise experience.</p></div>
      <div className="ed-tour-layout"><div className="ed-tour-copy"><div className="ed-tour-steps" aria-label="Product walkthrough">{tourSteps.map((item,i)=><button key={item.id} className={i===step?'ed-tour-step is-active':'ed-tour-step'} aria-pressed={i===step} aria-controls="product-tour-panel" onClick={()=>setStep(i)}><span className="ed-step-number" aria-hidden="true">0{i+1}</span><span>{item.short}</span><ArrowUpRight size={16} aria-hidden="true"/></button>)}</div><div className="ed-tour-description" aria-live="polite"><h3>{current.title}</h3><p>{current.description}</p><span className="ed-tour-detail"><Check size={15} aria-hidden="true"/>{current.detail}</span></div><button className="ed-text-link" onClick={onGetStarted}>Try it in the demo <ArrowRight size={16} aria-hidden="true"/></button></div><figure className="ed-tour-figure"><div id="product-tour-panel" role="region" aria-label={current.short} className="ed-tour-panel">{step===0?<TransactionScene/>:step===1?<BudgetScene/>:<GoalScene/>}</div><figcaption>{current.caption}</figcaption></figure></div>
    </section>
    <section id="benefits" className="ed-benefits"><div className="ed-shell"><div className="ed-benefits-heading"><h2>Less noise.<br/>More perspective.</h2><p>Your finances are more than a balance. See the habits, decisions, and possibilities around it.</p></div><div className="ed-benefit-grid">{[
      ['Understand the everyday.','Bring sample transactions into one searchable view. Follow spending by category and see where the little things add up.'],
      ['Give your month a shape.','Compare sample spending with a budget you set. Keep the limit and the reality in the same picture.'],
      ['Keep your future in view.','Turn a wish into a sample savings goal. Record a fictional contribution and see the progress it makes.'],
    ].map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section className="ed-boundaries ed-shell"><div><p className="ed-intro">A product you can explore today</p><h2>A clear view of<br/>what works.</h2></div><div className="ed-boundary-content"><p className="ed-boundary-lead">This is a working product demonstration, with room to explore and no financial commitments.</p><div className="ed-boundary-list"><p><Check size={17} aria-hidden="true"/><span>Interactive transactions, budgets, and goals</span></p><p><Check size={17} aria-hidden="true"/><span>Fictional data and session-only changes</span></p><p><Check size={17} aria-hidden="true"/><span>No bank connection, payment, or live AI service</span></p></div><details className="ed-calculator"><summary>Explore an illustrative savings scenario <ChevronDown size={17} aria-hidden="true"/></summary><ROICalculator onGetStarted={onGetStarted}/></details></div></section>
    <Pricing onGetStarted={onGetStarted}/>
    <section id="faq" className="ed-faq ed-shell"><div><p className="ed-intro">A few useful details</p><h2>Before you<br/>step inside.</h2></div><div>{questions.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <section className="ed-closing"><div className="ed-shell"><div><p>A little clarity goes a long way.</p><h2>Start with a<br/>clearer picture.</h2></div><div><button className="ed-button ed-button-light" onClick={onGetStarted}>Explore the demo <ArrowUpRight size={17} aria-hidden="true"/></button><p>Fictional data. Real room to explore.</p></div></div></section>
    <footer id="contact" className="ed-footer ed-shell"><div><a className="ed-wordmark" href="#home">PennyWise<span aria-hidden="true">.</span></a><p>A little intention, for your money.</p></div><nav aria-label="Footer"><a href="#features">The product</a><a href="#pricing">Pricing</a><a href="#faq">Questions</a><a href="https://github.com/KingAlpha362/PennyWise">Source &amp; feedback <ArrowUpRight size={14} aria-hidden="true"/></a></nav><div className="ed-footer-bottom"><span>© {new Date().getFullYear()} PennyWise</span><span>A personal finance demo. No account or subscription is created.</span></div></footer>
  </div>;
}
