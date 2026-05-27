import { useState, useEffect, useMemo, useRef } from 'react';
import NumberFlow from '@number-flow/react';
import '../dashboard.css';
import AIAssistant from './dashboard/AIAssistant.jsx';
import Settings from './dashboard/Settings.jsx';
import { buildAISummary } from './dashboard/aiEngine.js';

/* ============================================================
   DATA
   ============================================================ */
const CATEGORIES = {
  groceries: { name: 'Groceries', color: '#22c55e', icon: 'shopping-cart' },
  dining: { name: 'Dining', color: '#f59e0b', icon: 'utensils' },
  transport: { name: 'Transport', color: '#3b82f6', icon: 'car' },
  rent: { name: 'Housing', color: '#a855f7', icon: 'home' },
  utilities: { name: 'Utilities', color: '#06b6d4', icon: 'zap' },
  subs: { name: 'Subscriptions', color: '#ec4899', icon: 'repeat' },
  shopping: { name: 'Shopping', color: '#f97316', icon: 'bag' },
  health: { name: 'Health', color: '#ef4444', icon: 'heart' },
  income: { name: 'Income', color: '#16a34a', icon: 'arrow-down' },
  transfer: { name: 'Transfer', color: '#64748b', icon: 'arrow-right' },
  entertainment: { name: 'Entertainment', color: '#8b5cf6', icon: 'film' },
  travel: { name: 'Travel', color: '#0ea5e9', icon: 'plane' },
  savings: { name: 'Savings', color: '#10b981', icon: 'piggy' },
  investments: { name: 'Investments', color: '#0d9488', icon: 'trending' },
  fees: { name: 'Fees', color: '#9ca3af', icon: 'tag' },
};

const ACCOUNTS = [
  { id: 'chk', name: 'Everyday Checking', bank: 'Chase', type: 'checking', last4: '4821', balance: 4382.17, color: '#1d4ed8' },
  { id: 'sav', name: 'High-Yield Savings', bank: 'Ally', type: 'savings', last4: '9120', balance: 28450.00, color: '#7c3aed', apy: 4.25 },
  { id: 'cc1', name: 'Sapphire Reserve', bank: 'Chase', type: 'credit', last4: '0033', balance: -1842.55, limit: 18000, color: '#0f172a' },
  { id: 'cc2', name: 'Apple Card', bank: 'Goldman', type: 'credit', last4: '7711', balance: -312.40, limit: 7500, color: '#ef4444' },
  { id: 'inv', name: 'Brokerage', bank: 'Fidelity', type: 'investment', last4: '5582', balance: 47218.93, color: '#16a34a' },
  { id: '401', name: '401(k) Pre-Tax', bank: 'Empower', type: 'retirement', last4: '1042', balance: 92847.30, color: '#0891b2' },
];

function generateNetWorth() {
  const series = [];
  let v = 156000;
  // Seeded pseudo-random for stable rendering between mounts
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 90; i++) {
    const drift = 320 + Math.sin(i / 7) * 180;
    const noise = (rand() - 0.5) * 900;
    v += drift + noise;
    series.push({ d: i, v: Math.round(v) });
  }
  return series;
}
const NET_WORTH = generateNetWorth();

const CASHFLOW = [
  { m: 'Dec', y: 2024, income: 8240, expenses: 5410 },
  { m: 'Jan', y: 2025, income: 8240, expenses: 6128 },
  { m: 'Feb', y: 2025, income: 8240, expenses: 5240 },
  { m: 'Mar', y: 2025, income: 9180, expenses: 6402 },
  { m: 'Apr', y: 2025, income: 8240, expenses: 5891 },
  { m: 'May', y: 2025, income: 8240, expenses: 7120 },
  { m: 'Jun', y: 2025, income: 8480, expenses: 6240 },
  { m: 'Jul', y: 2025, income: 8480, expenses: 6815 },
  { m: 'Aug', y: 2025, income: 8480, expenses: 5942 },
  { m: 'Sep', y: 2025, income: 8480, expenses: 6128 },
  { m: 'Oct', y: 2025, income: 9120, expenses: 6588 },
  { m: 'Nov', y: 2025, income: 8480, expenses: 4982 },
];

const CATEGORY_BREAKDOWN = [
  { cat: 'rent', amount: 1850, prev: 1850 },
  { cat: 'groceries', amount: 612.40, prev: 548.20 },
  { cat: 'dining', amount: 384.18, prev: 421.55 },
  { cat: 'transport', amount: 218.50, prev: 280.10 },
  { cat: 'utilities', amount: 187.32, prev: 184.20 },
  { cat: 'subs', amount: 142.88, prev: 142.88 },
  { cat: 'shopping', amount: 411.20, prev: 178.40 },
  { cat: 'entertainment', amount: 89.40, prev: 124.20 },
  { cat: 'health', amount: 64.00, prev: 0 },
  { cat: 'fees', amount: 22.40, prev: 12.00 },
];

const BUDGETS = [
  { cat: 'groceries', spent: 612.40, budget: 700, txns: 14 },
  { cat: 'dining', spent: 384.18, budget: 350, txns: 11 },
  { cat: 'transport', spent: 218.50, budget: 300, txns: 18 },
  { cat: 'shopping', spent: 411.20, budget: 250, txns: 6 },
  { cat: 'entertainment', spent: 89.40, budget: 150, txns: 4 },
  { cat: 'subs', spent: 142.88, budget: 160, txns: 8 },
  { cat: 'health', spent: 64.00, budget: 120, txns: 2 },
  { cat: 'utilities', spent: 187.32, budget: 220, txns: 4 },
];

const GOALS = [
  { id: 'g1', name: 'Emergency fund', target: 25000, current: 18420, contrib: 600, due: '2026-04-30', color: '#16a34a', icon: 'shield' },
  { id: 'g2', name: 'Tokyo trip', target: 6500, current: 4180, contrib: 350, due: '2026-03-15', color: '#0ea5e9', icon: 'plane' },
  { id: 'g3', name: 'Down payment', target: 80000, current: 32450, contrib: 1200, due: '2028-01-01', color: '#a855f7', icon: 'home' },
  { id: 'g4', name: 'New MacBook', target: 3200, current: 2880, contrib: 200, due: '2025-12-20', color: '#f59e0b', icon: 'laptop' },
];

const SUBSCRIPTIONS = [
  { name: 'Netflix', amount: 22.99, next: '2025-12-02', cat: 'entertainment', logo: 'N' },
  { name: 'Spotify Family', amount: 16.99, next: '2025-12-04', cat: 'entertainment', logo: 'S' },
  { name: 'iCloud+ 2TB', amount: 9.99, next: '2025-12-06', cat: 'subs', logo: '' },
  { name: 'NYT Digital', amount: 17.00, next: '2025-12-09', cat: 'subs', logo: 'T' },
  { name: 'ChatGPT Plus', amount: 20.00, next: '2025-12-11', cat: 'subs', logo: 'AI' },
  { name: 'Adobe Creative', amount: 54.99, next: '2025-12-12', cat: 'subs', logo: 'Ai' },
  { name: 'Gym (Equinox)', amount: 215.00, next: '2025-12-15', cat: 'health', logo: 'E' },
  { name: 'Notion AI', amount: 10.00, next: '2025-12-18', cat: 'subs', logo: 'N' },
];

const TRANSACTIONS = [
  { id: 1, date: '2025-11-25', merchant: 'Whole Foods Market', cat: 'groceries', amount: -84.32, account: 'cc1', note: 'Weekly shop' },
  { id: 2, date: '2025-11-25', merchant: 'Blue Bottle Coffee', cat: 'dining', amount: -6.75, account: 'cc2' },
  { id: 3, date: '2025-11-24', merchant: 'Uber', cat: 'transport', amount: -22.40, account: 'cc1' },
  { id: 4, date: '2025-11-24', merchant: 'Joe & The Juice', cat: 'dining', amount: -14.20, account: 'cc2' },
  { id: 5, date: '2025-11-23', merchant: "Trader Joe's", cat: 'groceries', amount: -67.18, account: 'cc1' },
  { id: 6, date: '2025-11-22', merchant: 'Apple.com/Bill', cat: 'subs', amount: -9.99, account: 'cc2', note: 'iCloud+ 2TB' },
  { id: 7, date: '2025-11-22', merchant: 'Shell Gas Station', cat: 'transport', amount: -48.20, account: 'cc1' },
  { id: 8, date: '2025-11-22', merchant: 'Amazon.com', cat: 'shopping', amount: -129.40, account: 'cc1', note: 'Headphone replacement pads' },
  { id: 9, date: '2025-11-21', merchant: 'Sweetgreen', cat: 'dining', amount: -16.85, account: 'cc2' },
  { id: 10, date: '2025-11-21', merchant: 'Lyft', cat: 'transport', amount: -18.60, account: 'cc1' },
  { id: 11, date: '2025-11-20', merchant: 'Acme Inc. Payroll', cat: 'income', amount: 4240.00, account: 'chk', note: 'Bi-weekly' },
  { id: 12, date: '2025-11-20', merchant: 'Transfer to Savings', cat: 'transfer', amount: -1200.00, account: 'chk' },
  { id: 13, date: '2025-11-19', merchant: "Trader Joe's", cat: 'groceries', amount: -52.41, account: 'cc1' },
  { id: 14, date: '2025-11-19', merchant: 'Spotify USA', cat: 'subs', amount: -16.99, account: 'cc2' },
  { id: 15, date: '2025-11-18', merchant: 'Pacific Gas & Electric', cat: 'utilities', amount: -127.32, account: 'chk' },
  { id: 16, date: '2025-11-18', merchant: 'Comcast Xfinity', cat: 'utilities', amount: -60.00, account: 'chk' },
  { id: 17, date: '2025-11-17', merchant: 'Equinox', cat: 'health', amount: -215.00, account: 'cc1' },
  { id: 18, date: '2025-11-16', merchant: 'CVS Pharmacy', cat: 'health', amount: -28.40, account: 'cc2' },
  { id: 19, date: '2025-11-15', merchant: 'Tartine Bakery', cat: 'dining', amount: -22.50, account: 'cc1' },
  { id: 20, date: '2025-11-15', merchant: 'Netflix.com', cat: 'subs', amount: -22.99, account: 'cc2' },
  { id: 21, date: '2025-11-14', merchant: 'Foxtrot Market', cat: 'groceries', amount: -34.18, account: 'cc1' },
  { id: 22, date: '2025-11-14', merchant: 'BART Clipper', cat: 'transport', amount: -28.00, account: 'chk' },
  { id: 23, date: '2025-11-13', merchant: 'Nopalito', cat: 'dining', amount: -68.40, account: 'cc1', note: 'Dinner w/ Sam' },
  { id: 24, date: '2025-11-12', merchant: 'Amazon.com', cat: 'shopping', amount: -212.80, account: 'cc1', note: 'Kitchen knives' },
  { id: 25, date: '2025-11-12', merchant: 'Hinge', cat: 'subs', amount: -29.99, account: 'cc2' },
  { id: 26, date: '2025-11-11', merchant: 'Costco Wholesale', cat: 'groceries', amount: -184.20, account: 'cc1' },
  { id: 27, date: '2025-11-11', merchant: 'Chevron', cat: 'transport', amount: -52.80, account: 'cc1' },
  { id: 28, date: '2025-11-10', merchant: 'Apartment LLC', cat: 'rent', amount: -1850.00, account: 'chk' },
  { id: 29, date: '2025-11-10', merchant: 'Verizon Wireless', cat: 'utilities', amount: -85.00, account: 'chk' },
  { id: 30, date: '2025-11-09', merchant: 'AMC Theatres', cat: 'entertainment', amount: -38.50, account: 'cc1', note: 'Saturday movie' },
  { id: 31, date: '2025-11-09', merchant: 'Shake Shack', cat: 'dining', amount: -19.40, account: 'cc1' },
  { id: 32, date: '2025-11-08', merchant: 'Bi-Rite Creamery', cat: 'dining', amount: -12.20, account: 'cc2' },
  { id: 33, date: '2025-11-08', merchant: 'Whole Foods Market', cat: 'groceries', amount: -94.18, account: 'cc1' },
  { id: 34, date: '2025-11-07', merchant: 'NYT Digital', cat: 'subs', amount: -17.00, account: 'cc2' },
  { id: 35, date: '2025-11-06', merchant: 'Acme Inc. Payroll', cat: 'income', amount: 4240.00, account: 'chk', note: 'Bi-weekly' },
  { id: 36, date: '2025-11-06', merchant: 'Transfer to Savings', cat: 'transfer', amount: -600.00, account: 'chk' },
  { id: 37, date: '2025-11-05', merchant: 'Uniqlo', cat: 'shopping', amount: -69.00, account: 'cc1' },
  { id: 38, date: '2025-11-04', merchant: 'Souvla', cat: 'dining', amount: -24.40, account: 'cc1' },
  { id: 39, date: '2025-11-03', merchant: 'Adobe Creative Cloud', cat: 'subs', amount: -54.99, account: 'cc2' },
  { id: 40, date: '2025-11-02', merchant: 'Daily Driver', cat: 'dining', amount: -18.20, account: 'cc1' },
  { id: 41, date: '2025-11-01', merchant: 'ChatGPT Plus', cat: 'subs', amount: -20.00, account: 'cc2' },
  { id: 42, date: '2025-10-31', merchant: 'CB2 Furniture', cat: 'shopping', amount: -680.00, account: 'cc1', note: 'Lamp + side table' },
  { id: 43, date: '2025-10-30', merchant: 'Saison', cat: 'dining', amount: -184.00, account: 'cc1', note: 'Anniversary' },
];

const INSIGHTS = [
  { id: 'i1', severity: 'warn', title: 'Dining 32% over your average',
    body: "You've spent $384 on dining this month — your weekly average crept from $68 → $96. Two restaurant dinners account for $252 of that.",
    action: 'Set $90/wk cap', cat: 'dining' },
  { id: 'i2', severity: 'pos', title: 'Subscriptions trimmed $48/mo',
    body: "PennyWise canceled Disney+ and Headspace after 60 days of zero use. That's $576 a year back in your pocket.",
    action: 'Review 8 active subs', cat: 'subs' },
  { id: 'i3', severity: 'info', title: 'You can hit "Tokyo trip" by Feb 28',
    body: 'Bumping your weekly contribution from $87 → $110 closes the $2,320 gap five weeks early.',
    action: 'Auto-increase contribution', cat: 'travel' },
  { id: 'i4', severity: 'warn', title: 'Sapphire statement closes in 4 days',
    body: 'Balance is $1,842 (10.2% of limit). Paying $1,000 now keeps utilization under 5% for the reporting cycle.',
    action: 'Schedule $1,000 payment', cat: 'fees' },
  { id: 'i5', severity: 'pos', title: 'High-yield savings earning $96/mo',
    body: "Ally's 4.25% APY is producing more than your last 3 months of streaming subscriptions combined.",
    action: 'View savings', cat: 'savings' },
];

/* ============================================================
   HELPERS
   ============================================================ */
function fmt(v, { sign = false, decimals = 2 } = {}) {
  const s = sign && v > 0 ? '+' : '';
  const a = Math.abs(v);
  const n = a.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${v < 0 ? '−' : s}$${n}`;
}
function fmtCompact(v) {
  const a = Math.abs(v);
  let s;
  if (a >= 1e6) s = (v / 1e6).toFixed(1) + 'M';
  else if (a >= 1e3) s = (v / 1e3).toFixed(1) + 'K';
  else s = v.toFixed(0);
  return `$${s.replace('-', '−')}`;
}
function fmtDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function fmtDayWeek(d) {
  const dt = new Date(d);
  const now = new Date('2025-11-25');
  const diff = Math.round((now - dt) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return dt.toLocaleDateString('en-US', { weekday: 'long' });
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ============================================================
   ICONS
   ============================================================ */
function Icon({ name, size = 16, stroke = 1.75, className = '', style = {} }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    className, style,
  };
  switch (name) {
    case 'home': return <svg {...props}><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V10z"/></svg>;
    case 'wallet': return <svg {...props}><path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h12"/><circle cx="17" cy="14" r="1.2" fill="currentColor"/></svg>;
    case 'list': return <svg {...props}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
    case 'pie': return <svg {...props}><path d="M21 15.5A9 9 0 1 1 8.5 3"/><path d="M21 12A9 9 0 0 0 12 3v9z"/></svg>;
    case 'flag': return <svg {...props}><path d="M4 22V4a1 1 0 0 1 .4-.8c1.9-1.4 4.6-1.4 6.5 0a5.5 5.5 0 0 0 6.5 0 1 1 0 0 1 1.6.8v9a1 1 0 0 1-.4.8c-1.9 1.4-4.6 1.4-6.5 0a5.5 5.5 0 0 0-6.5 0"/></svg>;
    case 'trending': return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case 'moon': return <svg {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case 'arrow-up': return <svg {...props}><path d="M7 17 17 7M7 7h10v10"/></svg>;
    case 'arrow-down': return <svg {...props}><path d="M17 7 7 17M17 17H7V7"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'shopping-cart': return <svg {...props}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>;
    case 'utensils': return <svg {...props}><path d="M3 2v7a3 3 0 0 0 3 3v10M9 2v20M16 11V2c-3 0-5 2-5 5v4a3 3 0 0 0 3 3h2v8"/></svg>;
    case 'car': return <svg {...props}><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>;
    case 'zap': return <svg {...props}><path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z"/></svg>;
    case 'repeat': return <svg {...props}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
    case 'bag': return <svg {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 1 1-8 0"/></svg>;
    case 'heart': return <svg {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>;
    case 'film': return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>;
    case 'plane': return <svg {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 4S18 5 16.5 6.5L13 10 4.8 8.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 14l-1.5 2H5l-1 1 3 1 1 3 1-1v-2.5L11 16l3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
    case 'piggy': return <svg {...props}><path d="M19 5a3 3 0 0 0-3 3v.5a8 8 0 0 0-13 6.5c0 1.5.5 3 1.5 4.2V21h3v-1.4a8 8 0 0 0 4.5 1.4 8 8 0 0 0 7-4h2v-3l-2-.5a8 8 0 0 0-2.5-4.6V8a1 1 0 0 1 1-1 1 1 0 0 0 1-1V5z"/><circle cx="13" cy="11" r="1" fill="currentColor"/></svg>;
    case 'shield': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'laptop': return <svg {...props}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>;
    case 'tag': return <svg {...props}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.1-7.1a2 2 0 0 1-.6-1.4V3h9.2c.5 0 1 .2 1.4.6l7.1 7.1a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor"/></svg>;
    case 'check': return <svg {...props}><path d="m5 12 5 5L20 7"/></svg>;
    case 'x': return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'chevron-down': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'more': return <svg {...props}><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/><circle cx="5" cy="12" r="1.2" fill="currentColor"/></svg>;
    case 'download': return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
    case 'lock': return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'logout': return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'message-circle': return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'crown': return <svg {...props}><path d="M3 18h18M5 18 2 8l5 4 5-7 5 7 5-4-3 10"/></svg>;
    case 'menu': return <svg {...props}><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    case 'calendar': return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'alert': return <svg {...props}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>;
    case 'menu': return <svg {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'bar-chart': return <svg {...props}><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="4" width="4" height="17"/><path d="M3 3h18"/></svg>;
    case 'chart-line': return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/></svg>;
    case 'chart-area': return <svg {...props}><path d="M3 17l6-6 4 4 8-8"/><path d="M3 17 9 11l4 4 8-8v12H3z" strokeWidth={0} fill="currentColor" opacity="0.25"/></svg>;
    case 'bar-h': return <svg {...props}><rect x="3" y="4" width="10" height="3" rx="1"/><rect x="3" y="10.5" width="16" height="3" rx="1"/><rect x="3" y="17" width="7" height="3" rx="1"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

function ChartTypePicker({ options, value, onChange }) {
  return (
    <div className="pw-chart-type-picker">
      {options.map(opt => (
        <button
          key={opt.value}
          title={opt.label}
          className={`pw-chart-type-btn ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          <Icon name={opt.icon} size={12} stroke={2}/>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function CatDot({ cat, size = 28 }) {
  const c = CATEGORIES[cat] || { color: '#64748b', icon: 'tag' };
  return (
    <div className="pw-cat" style={{
      width: size, height: size,
      background: c.color + '20',
      color: c.color,
      border: `1px solid ${c.color}30`,
    }}>
      <Icon name={c.icon} size={Math.round(size * 0.5)} stroke={2}/>
    </div>
  );
}

/* ============================================================
   CHARTS
   ============================================================ */
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function Sparkline({ data, width = 120, height = 32, stroke = 'currentColor', fill = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 2) - 1,
  ]);
  const path = smoothPath(pts);
  const area = path + ` L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      {fill && <path d={area} fill={stroke} opacity="0.12"/>}
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function AreaChart({ data, width = 720, height = 240, color, dateFmt = (i) => i, chartType = 'area' }) {
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  color = color || 'var(--brand)';
  const pad = { t: 14, r: 8, b: 26, l: 50 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const values = data.map(d => d.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = min + (range * i) / yTicks;
    return { v, y: pad.t + h - (i / yTicks) * h };
  });

  // Bar chart: aggregate into ~12 equal buckets
  const N_BARS = 12;
  const barBuckets = Array.from({ length: N_BARS }, (_, bi) => {
    const start = Math.round((bi / N_BARS) * data.length);
    const end = Math.round(((bi + 1) / N_BARS) * data.length);
    const slice = data.slice(start, end);
    const avg = slice.reduce((s, d) => s + d.v, 0) / slice.length;
    const midIdx = Math.round((start + end) / 2);
    return { v: avg, midIdx, start, end };
  });
  const barW = (w / N_BARS) * 0.55;

  // Line/area chart
  const pts = data.map((d, i) => [
    pad.l + (i / (data.length - 1)) * w,
    pad.t + h - ((d.v - min) / range) * h,
  ]);
  const path = smoothPath(pts);
  const area = path + ` L${pad.l + w},${pad.t + h} L${pad.l},${pad.t + h} Z`;

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    if (chartType === 'bar') {
      const bi = Math.floor(((x - pad.l) / w) * N_BARS);
      if (bi < 0 || bi >= N_BARS) return setHover(null);
      const b = barBuckets[bi];
      const bx = pad.l + (bi / N_BARS) * w + w / N_BARS / 2;
      const by = pad.t + h - ((b.v - min) / range) * h;
      setHover({ i: b.midIdx, x: bx, y: by, barIdx: bi });
    } else {
      if (x < pad.l || x > pad.l + w) return setHover(null);
      const i = Math.round(((x - pad.l) / w) * (data.length - 1));
      setHover({ i, x: pts[i][0], y: pts[i][1] });
    }
  };

  const xN = chartType === 'bar' ? N_BARS : 5;
  const xLabels = chartType === 'bar'
    ? barBuckets.map((b, bi) => ({ idx: b.midIdx, x: pad.l + (bi / N_BARS) * w + w / N_BARS / 2 }))
    : Array.from({ length: xN }, (_, i) => {
        const idx = Math.round((i / (xN - 1)) * (data.length - 1));
        return { idx, x: pts[idx][0] };
      });

  // Only show every 3rd x label in bar mode to avoid crowding
  const visibleXLabels = chartType === 'bar' ? xLabels.filter((_, i) => i % 3 === 0) : xLabels;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible', cursor: 'crosshair' }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="pwAreaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
            <stop offset="60%" stopColor={color} stopOpacity="0.08"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={pad.l + w} y1={t.y} y2={t.y} stroke="var(--grid-line)" strokeDasharray="4 4"/>
            <text x={pad.l - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)" fontFamily="var(--font-mono)">
              {fmtCompact(t.v)}
            </text>
          </g>
        ))}
        {visibleXLabels.map((t, i) => (
          <text key={i} x={t.x} y={pad.t + h + 18} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="var(--font-mono)">
            {dateFmt(t.idx)}
          </text>
        ))}

        {chartType === 'bar' && barBuckets.map((b, bi) => {
          const bx = pad.l + (bi / N_BARS) * w + w / N_BARS / 2;
          const bh = ((b.v - min) / range) * h;
          const isHov = hover?.barIdx === bi;
          return (
            <rect key={bi}
              x={bx - barW / 2} y={pad.t + h - bh} width={barW} height={bh}
              rx="3" fill={color} opacity={isHov ? 1 : 0.75}
              style={{ transition: 'opacity 120ms' }}
            />
          );
        })}

        {chartType === 'area' && <path d={area} fill="url(#pwAreaG)"/>}
        {(chartType === 'area' || chartType === 'line') && (
          <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        )}

        {hover && chartType !== 'bar' && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={pad.t} y2={pad.t + h} stroke={color} strokeDasharray="3 3" opacity="0.5"/>
            <circle cx={hover.x} cy={hover.y} r="5" fill={color} stroke="var(--bg-elev)" strokeWidth="2.5"/>
          </g>
        )}
        {hover && chartType === 'bar' && (
          <rect
            x={(pad.l + (hover.barIdx / N_BARS) * w)} y={pad.t}
            width={w / N_BARS} height={h}
            fill={color} opacity="0.06" rx="3"
          />
        )}
      </svg>
      {hover && (
        <div className="pw-tt" style={{
          left: `${Math.max(5, Math.min(85, (hover.x / width) * 100))}%`,
          top: `${(hover.y / height) * 100}%`,
          transform: 'translate(-50%, -130%)',
        }}>
          <div style={{ color: 'var(--text-faint)', fontSize: 10, marginBottom: 2 }}>{dateFmt(hover.i)}</div>
          <div className="pw-num" style={{ fontWeight: 600 }}>{fmtCompact(data[hover.i].v)}</div>
        </div>
      )}
    </div>
  );
}

function CashflowBars({ data, width = 720, height = 220, chartType = 'bars' }) {
  const [hover, setHover] = useState(null);
  const pad = { t: 12, r: 8, b: 26, l: 44 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const max = Math.max(...data.map(d => Math.max(d.income, d.expenses))) * 1.1;
  const barW = (w / data.length) * 0.35;
  const groupW = (w / data.length);

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => ({
    v: (max * i) / yTicks,
    y: pad.t + h - (i / yTicks) * h,
  }));

  // Line chart: compute smooth paths for income/expenses
  const incomePts = data.map((d, i) => [pad.l + groupW * i + groupW / 2, pad.t + h - (d.income / max) * h]);
  const expPts    = data.map((d, i) => [pad.l + groupW * i + groupW / 2, pad.t + h - (d.expenses / max) * h]);
  const incomePath = smoothPath(incomePts);
  const expPath    = smoothPath(expPts);
  const incomeArea = incomePath + ` L${incomePts[incomePts.length-1][0]},${pad.t+h} L${incomePts[0][0]},${pad.t+h} Z`;
  const expArea    = expPath    + ` L${expPts[expPts.length-1][0]},${pad.t+h} L${expPts[0][0]},${pad.t+h} Z`;

  const tooltipContent = (d) => (
    <div style={{ display: 'grid', gap: 3, fontSize: 11.5 }}>
      <div style={{ color: 'var(--text-faint)', fontSize: 10, marginBottom: 4 }}>{d.m} {d.y}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--brand)' }}/>
        <span style={{ color: 'var(--text-muted)' }}>Income</span>
        <span className="pw-num" style={{ marginLeft: 8, fontWeight: 600 }}>{fmt(d.income, { decimals: 0 })}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--neg)' }}/>
        <span style={{ color: 'var(--text-muted)' }}>Expenses</span>
        <span className="pw-num" style={{ marginLeft: 8, fontWeight: 600 }}>{fmt(d.expenses, { decimals: 0 })}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4, borderTop: '1px solid var(--border)', marginTop: 2 }}>
        <span style={{ color: 'var(--text-muted)' }}>Net</span>
        <span className="pw-num" style={{ marginLeft: 'auto', fontWeight: 600, color: d.income - d.expenses >= 0 ? 'var(--pos)' : 'var(--neg)' }}>
          {fmt(d.income - d.expenses, { sign: true, decimals: 0 })}
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="pwIncomeG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="pwExpG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--neg)" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="var(--neg)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={pad.l + w} y1={t.y} y2={t.y} stroke="var(--grid-line)" strokeDasharray="4 4"/>
            <text x={pad.l - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)" fontFamily="var(--font-mono)">{fmtCompact(t.v)}</text>
          </g>
        ))}

        {chartType === 'bars' && data.map((d, i) => {
          const cx = pad.l + groupW * i + groupW / 2;
          const incH = (d.income / max) * h;
          const expH = (d.expenses / max) * h;
          const isHov = hover === i;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
              <rect x={pad.l + groupW * i} y={pad.t} width={groupW} height={h} fill="transparent"/>
              <rect x={cx - barW - 2} y={pad.t + h - incH} width={barW} height={incH} rx="3" fill="var(--brand)" opacity={isHov ? 1 : 0.85}/>
              <rect x={cx + 2} y={pad.t + h - expH} width={barW} height={expH} rx="3" fill="var(--neg)" opacity={isHov ? 0.85 : 0.55}/>
              <text x={cx} y={pad.t + h + 16} textAnchor="middle" fontSize="11" fill={isHov ? 'var(--text)' : 'var(--text-muted)'} fontFamily="var(--font-mono)" fontWeight={isHov ? 600 : 400}>{d.m}</text>
            </g>
          );
        })}

        {chartType === 'lines' && (
          <>
            <path d={incomeArea} fill="url(#pwIncomeG)"/>
            <path d={expArea} fill="url(#pwExpG)"/>
            <path d={incomePath} fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d={expPath} fill="none" stroke="var(--neg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"/>
            {data.map((d, i) => {
              const isHov = hover === i;
              return (
                <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
                  <rect x={pad.l + groupW * i} y={pad.t} width={groupW} height={h} fill="transparent"/>
                  {isHov && <line x1={incomePts[i][0]} x2={incomePts[i][0]} y1={pad.t} y2={pad.t + h} stroke="var(--border-strong)" strokeDasharray="3 3"/>}
                  <circle cx={incomePts[i][0]} cy={incomePts[i][1]} r={isHov ? 5 : 3} fill="var(--brand)" stroke="var(--bg-elev)" strokeWidth={isHov ? 2.5 : 1.5} style={{ transition: 'r 120ms' }}/>
                  <circle cx={expPts[i][0]}    cy={expPts[i][1]}    r={isHov ? 5 : 3} fill="var(--neg)"   stroke="var(--bg-elev)" strokeWidth={isHov ? 2.5 : 1.5} style={{ transition: 'r 120ms' }}/>
                  <text x={incomePts[i][0]} y={pad.t + h + 16} textAnchor="middle" fontSize="11" fill={isHov ? 'var(--text)' : 'var(--text-muted)'} fontFamily="var(--font-mono)" fontWeight={isHov ? 600 : 400}>{d.m}</text>
                </g>
              );
            })}
          </>
        )}
      </svg>
      {hover !== null && (() => {
        const d = data[hover];
        const cx = pad.l + groupW * hover + groupW / 2;
        return (
          <div className="pw-tt" style={{ left: `${(cx / width) * 100}%`, top: 0, transform: 'translate(-50%, -12px)' }}>
            {tooltipContent(d)}
          </div>
        );
      })()}
    </div>
  );
}

function Donut({ data, size = 200, thickness = 24 }) {
  const [hover, setHover] = useState(null);
  const total = data.reduce((s, d) => s + d.amount, 0);
  const r = size / 2 - thickness / 2;
  const cx = size / 2, cy = size / 2;
  const arcs = data.reduce((out, d) => {
    const runningTotal = out.length > 0 ? out[out.length - 1]._run : 0;
    const start = (runningTotal / total) * Math.PI * 2 - Math.PI / 2;
    const _run = runningTotal + d.amount;
    const end = (_run / total) * Math.PI * 2 - Math.PI / 2;
    return [...out, { ...d, start, end, _run }];
  }, []);
  const arcPath = (a) => {
    const [x0, y0] = [cx + r * Math.cos(a.start), cy + r * Math.sin(a.start)];
    const [x1, y1] = [cx + r * Math.cos(a.end), cy + r * Math.sin(a.end)];
    const large = a.end - a.start > Math.PI ? 1 : 0;
    return `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1}`;
  };
  return (
    <div className="pw-donut-wrap">
      <svg width={size} height={size} style={{ flexShrink: 0 }}>
        {arcs.map((a, i) => {
          const c = CATEGORIES[a.cat]?.color || '#64748b';
          const isHover = hover === i;
          return (
            <path key={i} d={arcPath(a)} fill="none" stroke={c}
                  strokeWidth={isHover ? thickness + 4 : thickness}
                  opacity={hover === null || isHover ? 1 : 0.35}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer', transition: 'stroke-width 0.18s, opacity 0.18s' }}/>
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="var(--text-faint)" letterSpacing="0.08em">
          {hover !== null ? (CATEGORIES[arcs[hover].cat]?.name || '').toUpperCase() : 'THIS MONTH'}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--text)" fontFamily="var(--font-mono)" letterSpacing="-0.02em">
          {hover !== null ? fmtCompact(arcs[hover].amount) : fmtCompact(total)}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fontSize="10" fill="var(--text-faint)" fontFamily="var(--font-mono)">
          {hover !== null ? `${Math.round((arcs[hover].amount / total) * 100)}% of spend` : `${arcs.length} categories`}
        </text>
      </svg>
      <div style={{ flex: 1, display: 'grid', gap: 6 }}>
        {arcs.slice(0, 6).map((a, i) => {
          const cat = CATEGORIES[a.cat];
          const pct = (a.amount / total) * 100;
          return (
            <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                 style={{
                   display: 'grid', gridTemplateColumns: '12px 1fr auto auto', gap: 10, alignItems: 'center',
                   padding: '4px 6px', borderRadius: 6, cursor: 'pointer',
                   background: hover === i ? 'var(--bg-hover)' : 'transparent',
                 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: cat?.color }}/>
              <span style={{ fontSize: 12, color: 'var(--text)' }}>{cat?.name}</span>
              <span className="pw-num" style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{pct.toFixed(1)}%</span>
              <span className="pw-num" style={{ fontSize: 12.5, fontWeight: 500 }}>{fmt(a.amount, { decimals: 0 })}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpendingBars({ data }) {
  const total = data.reduce((s, d) => s + d.amount, 0);
  const sorted = [...data].sort((a, b) => b.amount - a.amount);
  return (
    <div className="pw-hbar-list">
      {sorted.map((d, i) => {
        const cat = CATEGORIES[d.cat];
        const pct = (d.amount / total) * 100;
        return (
          <div key={i} className="pw-hbar-row">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: cat?.color, flexShrink: 0 }}/>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat?.name}</span>
            </div>
            <div className="pw-hbar-track">
              <div className="pw-hbar-fill" style={{ width: `${pct}%`, background: cat?.color }}/>
            </div>
            <div className="pw-num" style={{ fontSize: 12, fontWeight: 500, textAlign: 'right' }}>{fmt(d.amount, { decimals: 0 })}</div>
          </div>
        );
      })}
    </div>
  );
}

function GoalRing({ pct, size = 80, color, stroke = 6 }) {
  const r = size / 2 - stroke / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-soft)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
              strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)' }}/>
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="14" fontWeight="600"
            fill="var(--text)" fontFamily="var(--font-mono)">{Math.round(pct * 100)}%</text>
    </svg>
  );
}

/* ============================================================
   HEALTH GAUGE
   ============================================================ */
function HealthGauge({ score, size = 96, thickness = 10 }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const track = c * 0.75;
  const fill = track * (score / 100);
  const color = score >= 80 ? 'var(--pos)' : score >= 60 ? 'var(--warn)' : 'var(--neg)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
           style={{ transform: 'rotate(135deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--border)" strokeWidth={thickness}
          strokeDasharray={`${track} ${c - track}`} strokeLinecap="round"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={thickness}
          strokeDasharray={`${fill} ${c - fill}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 4px ${color}40)` }}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color, lineHeight: 1, letterSpacing: '-0.02em' }}>{score}</span>
        <span style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 1 }}>/ 100</span>
      </div>
    </div>
  );
}

/* ============================================================
   SHARED BITS
   ============================================================ */
function KPI({ label, value, rawValue, numFormat, delta, deltaPct, sub, series, invert = false, isPercent = false }) {
  const positive = invert ? delta < 0 : delta > 0;
  const color = positive ? 'var(--pos)' : 'var(--neg)';
  return (
    <div className="pw-kpi">
      <div className="pw-kpi-label">{label}</div>
      <div className="pw-kpi-value">
        {rawValue !== undefined
          ? <NumberFlow value={rawValue} locales="en-US" format={numFormat ?? { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />
          : value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <div className="pw-kpi-delta" style={{ color }}>
          <Icon name={positive ? 'arrow-up' : 'arrow-down'} size={11} stroke={2.5}/>
          <span className="pw-num">
            {isPercent ? `${Math.abs(deltaPct ?? delta).toFixed(1)}%`
              : (deltaPct !== undefined ? `${Math.abs(deltaPct).toFixed(1)}%` : fmt(Math.abs(delta), { decimals: 0 }))}
          </span>
          <span style={{ color: 'var(--text-faint)', fontWeight: 400, marginLeft: 4 }}>{sub}</span>
        </div>
        {series && <Sparkline data={series} width={70} height={22} stroke="var(--brand)"/>}
      </div>
    </div>
  );
}

function Legend({ swatches }) {
  return (
    <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
      {swatches.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 2, borderRadius: 1, background: s.color }}/>
          {s.label}
        </div>
      ))}
    </div>
  );
}

function RangeSegment({ range, setRange }) {
  return (
    <div className="pw-segment">
      {['1W','1M','3M','6M','1Y','ALL'].map(r => (
        <button key={r} className={range === r ? 'active' : ''} onClick={() => setRange(r)}>{r}</button>
      ))}
    </div>
  );
}

function AccountRow({ a }) {
  const isCredit = a.balance < 0;
  const util = a.limit ? Math.abs(a.balance) / a.limit : null;
  return (
    <div className="pw-row" style={{ gridTemplateColumns: '36px 1fr auto', gap: 12, height: 56 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: a.color, color: 'white',
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
      }}>{a.bank.slice(0, 2).toUpperCase()}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{a.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span>{a.bank}</span><span>•</span>
          <span className="pw-mono">··{a.last4}</span>
          {a.apy && <><span>•</span><span className="pw-num" style={{ color: 'var(--pos)' }}>{a.apy}% APY</span></>}
          {util !== null && <><span>•</span><span className="pw-num" style={{ color: util > 0.3 ? 'var(--warn)' : 'var(--text-faint)' }}>{Math.round(util * 100)}% used</span></>}
        </div>
      </div>
      <div className="pw-num" style={{ fontSize: 14, fontWeight: 600, color: isCredit ? 'var(--neg)' : 'var(--text)' }}>
        {fmt(a.balance, { decimals: 2 })}
      </div>
    </div>
  );
}

function TxnRow({ t, compact = false }) {
  const cat = CATEGORIES[t.cat];
  const acct = ACCOUNTS.find(a => a.id === t.account);
  return (
    <div className="pw-row" style={{
      gridTemplateColumns: compact ? '28px 1fr auto' : '28px 90px 1fr auto auto',
      gap: 12,
      height: compact ? 48 : 44,
    }}>
      <CatDot cat={t.cat} size={28}/>
      {!compact && <div className="pw-mono" style={{ fontSize: 12, color: 'var(--text-faint)' }}>{fmtDate(t.date)}</div>}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.merchant}</div>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', gap: 6 }}>
          {compact && <span>{fmtDayWeek(t.date)}</span>}
          {compact && <span>•</span>}
          <span>{cat?.name}</span>
          {t.note && !compact && <><span>•</span><span style={{ fontStyle: 'italic' }}>{t.note}</span></>}
        </div>
      </div>
      {!compact && <div className="pw-tag" style={{ fontSize: 10 }}>··{acct?.last4}</div>}
      <div className="pw-num" style={{ fontSize: 13.5, fontWeight: 600, color: t.amount > 0 ? 'var(--pos)' : 'var(--text)' }}>
        {fmt(t.amount, { sign: true })}
      </div>
    </div>
  );
}

function BudgetRow({ b }) {
  const cat = CATEGORIES[b.cat];
  const pct = Math.min(1, b.spent / b.budget);
  const over = b.spent > b.budget;
  const remaining = b.budget - b.spent;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <CatDot cat={b.cat} size={22}/>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{cat?.name}</div>
        <div className="pw-num" style={{ fontSize: 12.5 }}>
          <span style={{ color: over ? 'var(--neg)' : 'var(--text)', fontWeight: 600 }}>{fmt(b.spent, { decimals: 0 })}</span>
          <span style={{ color: 'var(--text-faint)' }}> / {fmt(b.budget, { decimals: 0 })}</span>
        </div>
      </div>
      <div className="pw-bar">
        <div className={`pw-bar-fill ${over ? 'over' : (pct > 0.85 ? 'warn' : '')}`}
             style={{ width: `${pct * 100}%`, background: over ? 'var(--neg)' : (pct > 0.85 ? 'var(--warn)' : cat?.color) }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-faint)', marginTop: 4 }}>
        <span>{b.txns} txns</span>
        <span className={over ? 'pw-chip-neg pw-tag' : ''} style={over ? { fontSize: 10, padding: '1px 6px' } : {}}>
          {over ? `${fmt(Math.abs(remaining), { decimals: 0 })} over` : `${fmt(remaining, { decimals: 0 })} left`}
        </span>
      </div>
    </div>
  );
}

function MiniGoalCard({ g }) {
  const pct = g.current / g.target;
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12, background: 'var(--bg-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: g.color + '20', color: g.color, display: 'grid', placeItems: 'center' }}>
          <Icon name={g.icon} size={12} stroke={2.2}/>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
      </div>
      <div className="pw-num" style={{ fontSize: 16, fontWeight: 600 }}>
        {fmt(g.current, { decimals: 0 })}
        <span style={{ color: 'var(--text-faint)', fontWeight: 400, fontSize: 11.5 }}> / {fmt(g.target, { decimals: 0 })}</span>
      </div>
      <div className="pw-bar" style={{ marginTop: 6 }}>
        <div className="pw-bar-fill" style={{ width: `${pct * 100}%`, background: g.color }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-faint)', marginTop: 5 }}>
        <span>{Math.round(pct * 100)}%</span>
        <span>{fmt(g.contrib, { decimals: 0 })}/wk</span>
      </div>
    </div>
  );
}

function InsightMini({ ins }) {
  const colorMap = { warn: 'var(--warn)', pos: 'var(--pos)', info: 'var(--brand)' };
  const iconMap = { warn: 'alert', pos: 'check', info: 'sparkles' };
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10, padding: 14,
      display: 'grid', gap: 8, background: 'var(--bg-soft)',
      borderLeft: `2px solid ${colorMap[ins.severity]}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={iconMap[ins.severity]} size={14} style={{ color: colorMap[ins.severity] }}/>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ins.title}</div>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{ins.body}</div>
      <button className="pw-btn" style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: 11.5, marginTop: 2 }}>
        {ins.action} <Icon name="chevron-right" size={11}/>
      </button>
    </div>
  );
}

/* ============================================================
   SCREENS
   ============================================================ */
function Overview({ range, setRange, txns, setScreen, onAddTxn, onAddGoal, onExport }) {
  const [netWorthType, setNetWorthType] = useState('area');
  const [spendingType, setSpendingType] = useState('donut');
  const latest = NET_WORTH[NET_WORTH.length - 1].v;
  const prior = NET_WORTH[NET_WORTH.length - 31].v;
  const monthDelta = latest - prior;
  const monthPct = (monthDelta / prior) * 100;
  const thisMonth = CASHFLOW[CASHFLOW.length - 1];
  const netSavings = thisMonth.income - thisMonth.expenses;
  const savingsRate = (netSavings / thisMonth.income) * 100;
  const recentTxns = (txns || TRANSACTIONS).slice(0, 7);
  const todayTotal = (txns || TRANSACTIONS).filter(t => t.date === '2025-11-25' && t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const aiSummary = buildAISummary(AI_DATA);

  // Financial health score (4 factors × 25 pts each)
  const budgetOver = BUDGETS.filter(b => b.spent > b.budget).length;
  const savingsFactor = Math.round(Math.min(1, savingsRate / 25) * 25);
  const budgetFactor = Math.round((1 - budgetOver / BUDGETS.length) * 25);
  const cc1 = ACCOUNTS.find(a => a.id === 'cc1');
  const cc2 = ACCOUNTS.find(a => a.id === 'cc2');
  const avgCreditUtil = (Math.abs(cc1.balance) / cc1.limit + Math.abs(cc2.balance) / cc2.limit) / 2;
  const creditFactor = Math.round(Math.max(0, 1 - avgCreditUtil * 2.5) * 25);
  const savingsAcct = ACCOUNTS.find(a => a.id === 'sav');
  const emergencyFactor = Math.round(Math.min(1, savingsAcct.balance / (thisMonth.expenses * 6)) * 25);
  const healthScore = savingsFactor + budgetFactor + creditFactor + emergencyFactor;
  const healthGrade = healthScore >= 90 ? 'A' : healthScore >= 80 ? 'B+' : healthScore >= 70 ? 'B' : healthScore >= 60 ? 'C+' : 'C';
  const healthColor = healthScore >= 80 ? 'var(--pos)' : healthScore >= 60 ? 'var(--warn)' : 'var(--neg)';

  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Tuesday · Nov 25, 2025
          </div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Good evening, Sam
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <RangeSegment range={range} setRange={setRange}/>
          <button className="pw-btn" onClick={() => onExport?.()}><Icon name="download" size={14}/>Export</button>
          <button className="pw-btn pw-btn-primary" onClick={onAddTxn}><Icon name="plus" size={14}/>Add transaction</button>
        </div>
      </div>

      {/* AI Summary Card */}
      <div className="pw-ai-summary-card" style={{ marginBottom: 16 }}>
        <div className="pw-ai-summary-inner">
          <div className="pw-ai-summary-left">
            <div className="pw-ai-summary-label">
              <Icon name="sparkles" size={12} stroke={2}/>
              <span>Penny says</span>
            </div>
            <div className="pw-ai-summary-text">{aiSummary}</div>
          </div>
          <div className="pw-ai-summary-right">
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 8 }}>Good evening</div>
            <button className="pw-btn pw-btn-primary" style={{ fontSize: 12, padding: '7px 14px', whiteSpace: 'nowrap' }}
              onClick={() => setScreen('ai')}>
              Ask Penny anything <Icon name="chevron-right" size={13}/>
            </button>
          </div>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-kpi-grid-4">
          <KPI label="Net worth" rawValue={latest} numFormat={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} value={fmt(latest, { decimals: 0 })} delta={monthDelta} deltaPct={monthPct} sub="vs 30 days ago" series={NET_WORTH.slice(-30).map(d => d.v)}/>
          <KPI label="Income (Nov)" rawValue={thisMonth.income} value={fmt(thisMonth.income, { decimals: 0 })} delta={thisMonth.income - CASHFLOW[CASHFLOW.length - 2].income} sub="vs Oct"/>
          <KPI label="Spending (Nov)" rawValue={thisMonth.expenses} value={fmt(thisMonth.expenses, { decimals: 0 })} delta={thisMonth.expenses - CASHFLOW[CASHFLOW.length - 2].expenses} invert sub="vs Oct"/>
          <KPI label="Savings rate" value={`${savingsRate.toFixed(1)}%`} delta={6.2} sub={`${fmt(netSavings, { decimals: 0 })} saved`} isPercent/>
        </div>
      </div>

      {/* Financial Health Card */}
      <div className="pw-health-card">
        <HealthGauge score={healthScore}/>
        <div className="pw-health-info">
          <div className="pw-health-title">Financial Health</div>
          <div className="pw-health-grade" style={{ color: healthColor }}>{healthGrade}</div>
          <div className="pw-health-factors">
            {[
              { label: 'Savings rate', value: `${savingsFactor}/25`, color: savingsFactor >= 20 ? 'var(--pos)' : savingsFactor >= 13 ? 'var(--warn)' : 'var(--neg)' },
              { label: 'Budgets', value: `${budgetFactor}/25`, color: budgetFactor >= 20 ? 'var(--pos)' : budgetFactor >= 13 ? 'var(--warn)' : 'var(--neg)' },
              { label: 'Credit util', value: `${creditFactor}/25`, color: creditFactor >= 20 ? 'var(--pos)' : creditFactor >= 13 ? 'var(--warn)' : 'var(--neg)' },
              { label: 'Emergency fund', value: `${emergencyFactor}/25`, color: emergencyFactor >= 20 ? 'var(--pos)' : emergencyFactor >= 13 ? 'var(--warn)' : 'var(--neg)' },
            ].map(f => (
              <div key={f.label} className="pw-health-factor">
                <span className="pw-health-factor-dot" style={{ background: f.color }}/>
                <span>{f.label}</span>
                <span className="pw-num" style={{ color: f.color, fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 4 }}>Score</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: healthColor, letterSpacing: '-0.03em', lineHeight: 1 }}>
            <NumberFlow value={healthScore} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>out of 100</div>
        </div>
      </div>

      <div className="pw-grid-2-1" style={{ gap: 16, marginBottom: 16 }}>
        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Net worth</div>
              <div className="pw-card-sub">Last 90 days · all accounts</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChartTypePicker
                value={netWorthType}
                onChange={setNetWorthType}
                options={[
                  { value: 'area', label: 'Area', icon: 'chart-area' },
                  { value: 'line', label: 'Line', icon: 'chart-line' },
                  { value: 'bar',  label: 'Bar',  icon: 'bar-chart' },
                ]}
              />
            </div>
          </div>
          <div className="pw-card-body" style={{ padding: '4px 8px 14px' }}>
            <AreaChart data={NET_WORTH} height={240} chartType={netWorthType}
                       dateFmt={(i) => {
                         const dt = new Date(2025, 7, 27);
                         dt.setDate(dt.getDate() + i);
                         return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                       }}/>
          </div>
        </div>

        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Where money went</div>
              <div className="pw-card-sub">November · {fmt(thisMonth.expenses, { decimals: 0 })}</div>
            </div>
            <ChartTypePicker
              value={spendingType}
              onChange={setSpendingType}
              options={[
                { value: 'donut', label: 'Donut', icon: 'pie' },
                { value: 'bars',  label: 'Bars',  icon: 'bar-h' },
              ]}
            />
          </div>
          <div className="pw-card-body" style={{ paddingTop: 4 }}>
            {spendingType === 'donut'
              ? <Donut data={CATEGORY_BREAKDOWN} size={170} thickness={20}/>
              : <SpendingBars data={CATEGORY_BREAKDOWN}/>
            }
          </div>
        </div>
      </div>

      <div className="pw-grid-1-1" style={{ gap: 16, marginBottom: 16 }}>
        <div className="pw-card">
          <div className="pw-card-head">
            <div className="pw-card-title">Accounts</div>
            <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setScreen('transactions')}>Manage</button>
          </div>
          <div>{ACCOUNTS.map(a => <AccountRow key={a.id} a={a}/>)}</div>
        </div>

        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Recent activity</div>
              <div className="pw-card-sub">{fmt(todayTotal, { decimals: 2 })} today · 7 transactions</div>
            </div>
            <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setScreen('transactions')}>View all <Icon name="chevron-right" size={14}/></button>
          </div>
          <div>{recentTxns.map(t => <TxnRow key={t.id} t={t} compact/>)}</div>
        </div>
      </div>

      <div className="pw-grid-1-1" style={{ gap: 16, marginBottom: 16 }}>
        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Budgets</div>
              <div className="pw-card-sub">November · {BUDGETS.filter(b => b.spent > b.budget).length} over · {BUDGETS.length - BUDGETS.filter(b => b.spent > b.budget).length} on track</div>
            </div>
            <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setScreen('budgets')}>Edit</button>
          </div>
          <div className="pw-card-body">
            <div style={{ display: 'grid', gap: 12 }}>
              {BUDGETS.slice(0, 5).map(b => <BudgetRow key={b.cat} b={b}/>)}
            </div>
          </div>
        </div>

        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Goals</div>
              <div className="pw-card-sub">{GOALS.length} active</div>
            </div>
            <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={onAddGoal}>+ Add goal</button>
          </div>
          <div className="pw-card-body">
            <div className="pw-grid-2" style={{ gap: 12 }}>
              {GOALS.map(g => <MiniGoalCard key={g.id} g={g}/>)}
            </div>
          </div>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-card-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="sparkles" size={15} style={{ color: 'var(--brand)' }}/>
            <div>
              <div className="pw-card-title">PennyWise insights</div>
              <div className="pw-card-sub">{INSIGHTS.length} new this week</div>
            </div>
          </div>
        </div>
        <div className="pw-card-body">
          <div className="pw-grid-3" style={{ gap: 12 }}>
            {INSIGHTS.slice(0, 3).map(ins => <InsightMini key={ins.id} ins={ins}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Transactions ─── */
function Transactions({ txns, onAddTxn, onExport }) {
  const allTxns = txns || TRANSACTIONS;
  const [q, setQ] = useState('');
  const [activeCats, setActiveCats] = useState(new Set());
  const [activeAcct, setActiveAcct] = useState('all');
  const [selected, setSelected] = useState(new Set());

  const filtered = useMemo(() => allTxns.filter(t => {
    if (q && !t.merchant.toLowerCase().includes(q.toLowerCase()) && !(t.note || '').toLowerCase().includes(q.toLowerCase())) return false;
    if (activeCats.size && !activeCats.has(t.cat)) return false;
    if (activeAcct !== 'all' && t.account !== activeAcct) return false;
    return true;
  }), [q, activeCats, activeAcct, allTxns]);

  const grouped = useMemo(() => {
    const m = new Map();
    filtered.forEach(t => {
      if (!m.has(t.date)) m.set(t.date, []);
      m.get(t.date).push(t);
    });
    return Array.from(m.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const totals = useMemo(() => {
    const inc = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const exp = filtered.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);
    return { inc, exp, net: inc + exp };
  }, [filtered]);

  const toggleCat = (c) => {
    const next = new Set(activeCats);
    next.has(c) ? next.delete(c) : next.add(c);
    setActiveCats(next);
  };
  const toggleAll = () => setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(t => t.id)));
  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Activity</div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Transactions</h1>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>
            {filtered.length} of {TRANSACTIONS.length} ·{' '}
            <span className="pw-num">{fmt(totals.inc, { decimals: 0 })}</span> in ·{' '}
            <span className="pw-num">{fmt(totals.exp, { decimals: 0 })}</span> out ·{' '}
            <span className="pw-num" style={{ color: totals.net >= 0 ? 'var(--pos)' : 'var(--neg)', fontWeight: 600 }}>{fmt(totals.net, { sign: true, decimals: 0 })}</span> net
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="pw-btn" onClick={() => onExport?.(allTxns)}><Icon name="download" size={14}/>CSV</button>
          <button className="pw-btn pw-btn-primary" onClick={onAddTxn}><Icon name="plus" size={14}/>New transaction</button>
        </div>
      </div>

      <div className="pw-card pw-txn-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
          <div className="pw-search pw-txn-search-box" style={{ flex: '0 0 320px', cursor: 'text' }}>
            <Icon name="search" size={14}/>
            <input placeholder="Search merchant, note, amount…" value={q} onChange={e => setQ(e.target.value)}
                   style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-body)' }}/>
            {q && <button className="pw-icon-btn" style={{ width: 22, height: 22 }} onClick={() => setQ('')}><Icon name="x" size={12}/></button>}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
            {Object.entries(CATEGORIES).filter(([k]) => k !== 'transfer').slice(0, 8).map(([k, c]) => (
              <button key={k} onClick={() => toggleCat(k)} className="pw-tag" style={{
                cursor: 'pointer',
                borderColor: activeCats.has(k) ? c.color + '60' : 'var(--border)',
                background: activeCats.has(k) ? c.color + '15' : 'transparent',
                color: activeCats.has(k) ? c.color : 'var(--text-muted)',
                fontWeight: activeCats.has(k) ? 600 : 500,
              }}>
                <span className="pw-dot" style={{ background: c.color }}/>{c.name}
              </button>
            ))}
            {(activeCats.size > 0 || activeAcct !== 'all') && (
              <button onClick={() => { setActiveCats(new Set()); setActiveAcct('all'); }} className="pw-btn pw-btn-ghost" style={{ padding: '2px 8px', fontSize: 11 }}>Clear</button>
            )}
          </div>
        </div>

        {selected.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--brand-soft)', borderBottom: '1px solid var(--border)' }}>
            <Icon name="check" size={14} style={{ color: 'var(--brand)' }}/>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{selected.size} selected</span>
            <span style={{ flex: 1 }}/>
            <button className="pw-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => alert(`Categorize ${selected.size} transactions`)}>Bulk categorize</button>
            <button className="pw-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => alert(`Tag ${selected.size} transactions`)}>Tag</button>
            <button className="pw-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => onExport?.(allTxns.filter(t => selected.has(t.id)))}>Export</button>
            <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setSelected(new Set())}><Icon name="x" size={12}/></button>
          </div>
        )}

        <div className="pw-txn-table">
        <div className="pw-row pw-row-head" style={{ gridTemplateColumns: '32px 84px 28px 1fr 140px 100px 110px', gap: 12 }}>
          <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll}/>
          <span>Date</span><span/><span>Merchant</span><span>Category</span><span>Account</span>
          <span style={{ textAlign: 'right' }}>Amount</span>
        </div>

        <div>
          {grouped.map(([date, txns]) => {
            const dayTotal = txns.reduce((s, t) => s + t.amount, 0);
            return (
              <div key={date}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 6px 32px', background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border-soft)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    {fmtDayWeek(date)}
                    <span style={{ color: 'var(--text-faint)', fontWeight: 400, marginLeft: 8 }}>{txns.length} transaction{txns.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="pw-num" style={{ fontSize: 11.5, fontWeight: 600, color: dayTotal >= 0 ? 'var(--pos)' : 'var(--text-muted)' }}>{fmt(dayTotal, { sign: true, decimals: 0 })}</div>
                </div>
                {txns.map(t => {
                  const cat = CATEGORIES[t.cat];
                  const acct = ACCOUNTS.find(a => a.id === t.account);
                  const isSel = selected.has(t.id);
                  return (
                    <div key={t.id} className="pw-row" style={{
                      gridTemplateColumns: '32px 84px 28px 1fr 140px 100px 110px',
                      gap: 12,
                      background: isSel ? 'var(--brand-soft)' : 'transparent',
                    }}>
                      <input type="checkbox" checked={isSel} onChange={() => toggleOne(t.id)}/>
                      <div className="pw-mono" style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{fmtDate(t.date)}</div>
                      <CatDot cat={t.cat} size={24}/>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.merchant}</div>
                        {t.note && <div style={{ fontSize: 10.5, color: 'var(--text-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.note}</div>}
                      </div>
                      <div>
                        <span className="pw-tag" style={{ color: cat.color, background: cat.color + '12', borderColor: cat.color + '24' }}>
                          <span className="pw-dot" style={{ background: cat.color }}/>{cat.name}
                        </span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{acct?.bank} <span className="pw-mono" style={{ color: 'var(--text-faint)' }}>··{acct?.last4}</span></div>
                      <div className="pw-num" style={{ fontSize: 13.5, fontWeight: 600, color: t.amount > 0 ? 'var(--pos)' : 'var(--text)', textAlign: 'right' }}>
                        {fmt(t.amount, { sign: true })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-faint)' }}>
              <Icon name="search" size={28} stroke={1.5}/>
              <div style={{ marginTop: 8, fontSize: 13 }}>No transactions match your filters</div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Budgets ─── */
function Budgets({ onAddBudget }) {
  const totalBudget = BUDGETS.reduce((s, b) => s + b.budget, 0);
  const totalSpent = BUDGETS.reduce((s, b) => s + b.spent, 0);
  const over = BUDGETS.filter(b => b.spent > b.budget);
  const remaining = totalBudget - totalSpent;
  const daysLeft = 5;
  const [suggestionApplied, setSuggestionApplied] = useState(false);

  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            November 2025 · {daysLeft} days remaining
          </div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Budgets</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="pw-btn"><Icon name="calendar" size={14}/>Nov 2025</button>
          <button className="pw-btn pw-btn-primary" onClick={onAddBudget}><Icon name="plus" size={14}/>New budget</button>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16, padding: 24 }}>
        <div className="pw-grid-budget-kpi" style={{ gap: 24, alignItems: 'center' }}>
          <div>
            <div className="pw-kpi-label">Total budgeted</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
              <div className="pw-hero-metric">{fmt(totalSpent, { decimals: 0 })}</div>
              <div style={{ fontSize: 14, color: 'var(--text-faint)' }} className="pw-num">/ {fmt(totalBudget, { decimals: 0 })}</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="pw-bar" style={{ height: 10 }}>
                <div className={`pw-bar-fill ${totalSpent > totalBudget ? 'over' : ''}`} style={{ width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%` }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 6, color: 'var(--text-faint)' }}>
                <span>{Math.round((totalSpent / totalBudget) * 100)}% spent</span>
                <span className="pw-num">{fmt(remaining, { decimals: 0 })} left</span>
              </div>
            </div>
          </div>
          <div className="pw-vdivider"/>
          <div>
            <div className="pw-kpi-label">On track</div>
            <div className="pw-kpi-value" style={{ color: 'var(--pos)' }}>{BUDGETS.length - over.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>categories within budget</div>
          </div>
          <div>
            <div className="pw-kpi-label">Over budget</div>
            <div className="pw-kpi-value" style={{ color: 'var(--neg)' }}>{over.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>need attention</div>
          </div>
          <div>
            <div className="pw-kpi-label">Daily safe-to-spend</div>
            <div className="pw-kpi-value">{fmt(remaining / daysLeft, { decimals: 0 })}</div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>through Nov 30</div>
          </div>
        </div>
      </div>

      <div className="pw-ai-nudge" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="sparkles" size={14} style={{ color: 'var(--brand)', flexShrink: 0 }}/>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Penny suggests: </span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              reduce Shopping budget to $300 based on your 3-month average of $265/mo outside of one-time purchases.
            </span>
          </div>
          {suggestionApplied
            ? <span className="pw-tag pw-chip-pos" style={{ fontSize: 12 }}><Icon name="check" size={11}/>Applied</span>
            : <button className="pw-btn" style={{ padding: '4px 10px', fontSize: 12, whiteSpace: 'nowrap' }} onClick={() => setSuggestionApplied(true)}>Apply suggestion</button>
          }
        </div>
      </div>

      <div className="pw-grid-2" style={{ gap: 16, marginBottom: 16 }}>
        {BUDGETS.map(b => <BudgetCard key={b.cat} b={b}/>)}
      </div>
    </div>
  );
}

function BudgetCard({ b }) {
  const cat = CATEGORIES[b.cat];
  const pct = Math.min(1.5, b.spent / b.budget);
  const over = b.spent > b.budget;
  const remaining = b.budget - b.spent;
  const projected = b.spent + (b.spent / 25) * 5;
  const willOverflow = projected > b.budget;

  return (
    <div className="pw-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <CatDot cat={b.cat} size={36}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{cat?.name}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{b.txns} transactions this month</div>
        </div>
        {over && <span className="pw-tag pw-chip-neg">Over by {fmt(Math.abs(remaining), { decimals: 0 })}</span>}
        {!over && pct > 0.85 && <span className="pw-tag pw-chip-warn">Near limit</span>}
        {!over && pct <= 0.85 && <span className="pw-tag pw-chip-pos">On track</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
        <div className="pw-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: over ? 'var(--neg)' : 'var(--text)' }}>
          {fmt(b.spent, { decimals: 0 })}
        </div>
        <div className="pw-num" style={{ fontSize: 13, color: 'var(--text-faint)' }}>of {fmt(b.budget, { decimals: 0 })}</div>
      </div>

      <div style={{ position: 'relative', marginBottom: 10 }}>
        <div className="pw-bar" style={{ height: 8 }}>
          <div className={`pw-bar-fill ${over ? 'over' : (pct > 0.85 ? 'warn' : '')}`}
               style={{ width: `${Math.min(100, pct * 100)}%`, background: over ? 'var(--neg)' : (pct > 0.85 ? 'var(--warn)' : cat?.color) }}/>
        </div>
        {!over && willOverflow && (
          <div style={{ position: 'absolute', top: -3, left: `${Math.min(100, (projected / b.budget) * 100)}%`, height: 14, width: 2, background: 'var(--warn)', borderRadius: 1 }}/>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-muted)' }}>
        <span>{Math.round(pct * 100)}% used</span>
        <span>Projected: <span className="pw-num" style={{ color: willOverflow ? 'var(--warn)' : 'var(--text)', fontWeight: 500 }}>{fmt(projected, { decimals: 0 })}</span></span>
      </div>
    </div>
  );
}

/* ─── Goals ─── */
function Goals({ onAddGoal, onContribute }) {
  const totalSaved = GOALS.reduce((s, g) => s + g.current, 0);
  const totalTarget = GOALS.reduce((s, g) => s + g.target, 0);
  const monthlyContrib = GOALS.reduce((s, g) => s + g.contrib * 4.33, 0);

  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Saving for what's next</div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Goals</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="pw-btn" onClick={() => alert('Contribution scheduling coming soon — set up auto-transfers in Settings.')}>
            <Icon name="calendar" size={14}/>Schedule
          </button>
          <button className="pw-btn pw-btn-primary" onClick={onAddGoal}><Icon name="plus" size={14}/>Create goal</button>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-kpi-grid-4">
          <KPI label="Total saved" value={fmt(totalSaved, { decimals: 0 })} delta={2840} sub="this month"/>
          <KPI label="Across all goals" value={`${Math.round((totalSaved / totalTarget) * 100)}%`} delta={3.2} sub="of $114,700 target" isPercent/>
          <KPI label="Monthly contributions" value={fmt(monthlyContrib, { decimals: 0 })} delta={0} sub={`${GOALS.length} active goals`}/>
          <KPI label="Next milestone" value="$3,200" delta={320} sub="MacBook (Dec 20)"/>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {GOALS.map(g => <GoalCard key={g.id} g={g} onContribute={onContribute}/>)}
      </div>
    </div>
  );
}

function GoalCard({ g, onContribute }) {
  const pct = g.current / g.target;
  const remaining = g.target - g.current;
  const weeks = Math.ceil(remaining / g.contrib);
  const dueDate = new Date(g.due);
  const today = new Date('2025-11-25');
  const daysUntilDue = Math.round((dueDate - today) / 86400000);
  const onPace = weeks * 7 <= daysUntilDue;

  return (
    <div className="pw-card" style={{ padding: 20 }}>
      <div className="pw-goal-card-grid" style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 24, alignItems: 'center' }}>
        <GoalRing pct={pct} color={g.color} size={90} stroke={8}/>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: g.color + '20', color: g.color, display: 'grid', placeItems: 'center' }}>
              <Icon name={g.icon} size={13}/>
            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{g.name}</h3>
            <span className={`pw-tag ${onPace ? 'pw-chip-pos' : 'pw-chip-warn'}`}>{onPace ? 'On pace' : 'Behind pace'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
            <div className="pw-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{fmt(g.current, { decimals: 0 })}</div>
            <div className="pw-num" style={{ fontSize: 14, color: 'var(--text-faint)' }}>/ {fmt(g.target, { decimals: 0 })} target</div>
          </div>
          <div className="pw-bar" style={{ marginTop: 8, height: 6 }}>
            <div className="pw-bar-fill" style={{ width: `${pct * 100}%`, background: g.color }}/>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 11.5, color: 'var(--text-muted)' }}>
            <div>
              <div style={{ color: 'var(--text-faint)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Contributing</div>
              <div className="pw-num" style={{ fontWeight: 600, color: 'var(--text)' }}>{fmt(g.contrib, { decimals: 0 })} <span style={{ fontWeight: 400, color: 'var(--text-faint)' }}>/wk</span></div>
            </div>
            <div>
              <div style={{ color: 'var(--text-faint)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Remaining</div>
              <div className="pw-num" style={{ fontWeight: 600, color: 'var(--text)' }}>{fmt(remaining, { decimals: 0 })}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-faint)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Target date</div>
              <div style={{ fontWeight: 500, color: 'var(--text)' }}>{dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-faint)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>ETA at pace</div>
              <div style={{ fontWeight: 500, color: onPace ? 'var(--pos)' : 'var(--warn)' }}>{weeks} weeks</div>
            </div>
          </div>
        </div>
        <div className="pw-goal-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button className="pw-btn pw-btn-primary" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => onContribute?.(g.id)}>Contribute</button>
          <button className="pw-btn" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => alert(`Adjust "${g.name}": change your target amount or weekly contribution in Settings → Goals.`)}>Adjust</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Cashflow ─── */
function Cashflow({ onExport, setScreen }) {
  const ytdIncome = CASHFLOW.reduce((s, m) => s + m.income, 0);
  const ytdExp = CASHFLOW.reduce((s, m) => s + m.expenses, 0);
  const ytdNet = ytdIncome - ytdExp;
  const avgIncome = ytdIncome / CASHFLOW.length;
  const avgExp = ytdExp / CASHFLOW.length;
  const monthlyNet = avgIncome - avgExp;
  const [cfView, setCfView] = useState('Monthly');
  const [cashflowType, setCashflowType] = useState('bars');
  const [openSubIdx, setOpenSubIdx] = useState(null);

  const upcoming = SUBSCRIPTIONS.filter(s => {
    const d = new Date(s.next);
    const today = new Date('2025-11-25');
    return (d - today) / 86400000 <= 21 && d >= today;
  });
  const upcomingTotal = upcoming.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Last 12 months</div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Cashflow & forecast</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="pw-segment">
            {['Monthly', 'Weekly', 'Daily'].map(v => (
              <button key={v} className={cfView === v ? 'active' : ''} onClick={() => setCfView(v)}>{v}</button>
            ))}
          </div>
          <button className="pw-btn" onClick={() => onExport?.()}><Icon name="download" size={14}/>Export</button>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-kpi-grid-4">
          <KPI label="YTD Income" value={fmt(ytdIncome, { decimals: 0 })} delta={ytdIncome - 95000} sub="12 months"/>
          <KPI label="YTD Expenses" value={fmt(ytdExp, { decimals: 0 })} delta={ytdExp - 70000} invert sub="12 months"/>
          <KPI label="YTD Net savings" value={fmt(ytdNet, { decimals: 0 })} delta={ytdNet - 22000} sub={`${((ytdNet / ytdIncome) * 100).toFixed(1)}% savings rate`}/>
          <KPI label="Avg monthly burn" value={fmt(avgExp, { decimals: 0 })} delta={-180} sub="vs 6mo avg"/>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-card-head">
          <div>
            <div className="pw-card-title">Monthly cashflow</div>
            <div className="pw-card-sub">Income vs expenses · last 12 months</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Legend swatches={[{ color: 'var(--brand)', label: 'Income' }, { color: 'var(--neg)', label: 'Expenses' }]}/>
            <ChartTypePicker
              value={cashflowType}
              onChange={setCashflowType}
              options={[
                { value: 'bars',  label: 'Bars',  icon: 'bar-chart' },
                { value: 'lines', label: 'Lines', icon: 'chart-line' },
              ]}
            />
          </div>
        </div>
        <div className="pw-card-body" style={{ padding: '4px 12px 14px' }}>
          <CashflowBars data={CASHFLOW} height={240} chartType={cashflowType}/>
        </div>
      </div>

      <div className="pw-grid-2-1" style={{ gap: 16, marginBottom: 16 }}>
        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">6-month forecast</div>
              <div className="pw-card-sub">Based on current trends · assumes {fmt(monthlyNet, { decimals: 0 })}/mo net</div>
            </div>
          </div>
          <div className="pw-card-body" style={{ padding: '4px 12px 14px' }}>
            {(() => {
              const history = NET_WORTH.filter((_, i) => i % 5 === 0).slice(-18);
              let cur = NET_WORTH[NET_WORTH.length - 1].v;
              const forecast = [{ v: cur }];
              const totalSteps = 6 * 4;
              for (let i = 1; i <= totalSteps; i++) {
                cur += monthlyNet / 4.33;
                forecast.push({ v: cur });
              }
              const all = [...history.map(d => ({ v: d.v })), ...forecast];
              return <AreaChart data={all} height={240}
                       dateFmt={(i) => {
                         const hist = history.length;
                         if (i < hist) return `-${Math.round((hist - i) / 4)}mo`;
                         return `+${Math.round((i - hist) / 4.33)}mo`;
                       }}/>;
            })()}
          </div>
        </div>

        <div className="pw-card">
          <div className="pw-card-head">
            <div>
              <div className="pw-card-title">Upcoming bills</div>
              <div className="pw-card-sub">Next 21 days · <span className="pw-num">{fmt(upcomingTotal, { decimals: 0 })}</span></div>
            </div>
          </div>
          <div>
            {upcoming.map((s, i) => {
              const cat = CATEGORIES[s.cat];
              const dueDate = new Date(s.next);
              const today = new Date('2025-11-25');
              const days = Math.round((dueDate - today) / 86400000);
              return (
                <div key={i} className="pw-row" style={{ gridTemplateColumns: '32px 1fr auto', gap: 10, height: 48 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: cat.color + '20', color: cat.color, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    {s.logo || s.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-faint)' }}>
                      {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`} · {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="pw-num" style={{ fontSize: 13, fontWeight: 600 }}>{fmt(s.amount)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pw-card" style={{ marginBottom: 16 }}>
        <div className="pw-card-head">
          <div>
            <div className="pw-card-title">All recurring</div>
            <div className="pw-card-sub">
              {SUBSCRIPTIONS.length} active subscriptions ·{' '}
              <span className="pw-num">{fmt(SUBSCRIPTIONS.reduce((s, x) => s + x.amount, 0), { decimals: 0 })}</span>/mo ·{' '}
              <span className="pw-num">{fmt(SUBSCRIPTIONS.reduce((s, x) => s + x.amount, 0) * 12, { decimals: 0 })}</span>/yr
            </div>
          </div>
          <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setScreen('settings')}>Manage</button>
        </div>
        <div className="pw-row pw-row-head" style={{ gridTemplateColumns: '28px 1fr 100px 130px 80px 60px', gap: 12 }}>
          <span/><span>Service</span><span style={{ textAlign: 'right' }}>Amount</span><span>Next charge</span><span>Frequency</span><span/>
        </div>
        {SUBSCRIPTIONS.map((s, i) => {
          const cat = CATEGORIES[s.cat];
          return (
            <div key={i} className="pw-row" style={{ gridTemplateColumns: '28px 1fr 100px 130px 80px 60px', gap: 12, position: 'relative' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: cat.color + '20', color: cat.color, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {s.logo || s.name[0]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
              <div className="pw-num" style={{ fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{fmt(s.amount)}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(s.next).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
              <div><span className="pw-tag">monthly</span></div>
              <div style={{ position: 'relative' }}>
                <button className="pw-btn pw-btn-ghost" style={{ padding: '2px 6px' }} onClick={() => setOpenSubIdx(openSubIdx === i ? null : i)}>
                  <Icon name="more" size={14}/>
                </button>
                {openSubIdx === i && (
                  <div style={{ position: 'absolute', right: 0, top: '100%', zIndex: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-pop)', minWidth: 140, overflow: 'hidden' }}
                       onClick={e => e.stopPropagation()}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 14px', border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      onClick={() => { alert(`Pausing ${s.name} — feature coming soon.`); setOpenSubIdx(null); }}>
                      Pause billing
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 14px', border: 'none', background: 'transparent', color: 'var(--neg)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      onClick={() => { alert(`Cancel ${s.name}? This will remove it from your tracked subscriptions.`); setOpenSubIdx(null); }}>
                      Cancel subscription
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Forecast */}
      <div className="pw-ai-forecast">
        <div className="pw-ai-forecast-icon">
          <Icon name="sparkles" size={18} stroke={1.75}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>AI Forecast</div>
          <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
            Based on current trends, December spending will be approximately{' '}
            <span className="pw-num" style={{ color: 'var(--brand)', fontWeight: 700 }}>
              {fmt(CASHFLOW[CASHFLOW.length - 1].expenses * 1.12, { decimals: 0 })}
            </span>{' '}
            — holiday season typically adds 12% above your November baseline. Your income stays at{' '}
            <span className="pw-num" style={{ fontWeight: 600 }}>{fmt(CASHFLOW[CASHFLOW.length - 1].income, { decimals: 0 })}</span>, leaving{' '}
            a net of{' '}
            <span className="pw-num" style={{ color: 'var(--pos)', fontWeight: 600 }}>
              {fmt(CASHFLOW[CASHFLOW.length - 1].income - CASHFLOW[CASHFLOW.length - 1].expenses * 1.12, { decimals: 0 })}
            </span>.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Insights ─── */
function Insights({ setScreen }) {
  const [dismissed, setDismissed] = useState(new Set());
  const visible = INSIGHTS.filter(i => !dismissed.has(i.id));
  return (
    <div className="pw-screen pw-fadein">
      <div className="pw-screen-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="sparkles" size={11}/>PennyWise · AI
          </div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Smart insights</h1>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>Personalized to your spending patterns · Updated 4 min ago</div>
        </div>
        <button className="pw-btn" onClick={() => setScreen('settings')}><Icon name="settings" size={14}/>Preferences</button>
      </div>

      <div className="pw-card" style={{
        marginBottom: 16,
        background: 'linear-gradient(135deg, var(--brand-soft) 0%, transparent 60%)',
        borderColor: 'var(--brand-rim)',
        padding: 24,
      }}>
        <div className="pw-insights-takeaway" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
            color: 'white', display: 'grid', placeItems: 'center',
            boxShadow: '0 8px 20px var(--brand-soft)', flexShrink: 0,
          }}>
            <Icon name="sparkles" size={22}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>This week's takeaway</div>
            <div style={{ fontSize: 19, fontFamily: 'var(--font-display)', fontWeight: 700, marginTop: 4, letterSpacing: '-0.015em' }}>
              You're on pace to save <span style={{ color: 'var(--brand)' }} className="pw-num">$3,498</span> this month — your best November in 3 years.
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>
              Driven by lower dining out (−$37 vs Oct) and the $48/mo subscription trim. Keep it up and your emergency fund completes by April 8.
            </div>
          </div>
          <button className="pw-btn pw-btn-primary" onClick={() => setScreen('cashflow')}>See breakdown</button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        {visible.map(ins => <InsightCard key={ins.id} ins={ins} setScreen={setScreen} onDismiss={id => setDismissed(d => new Set([...d, id]))}/>)}
        {visible.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-faint)', fontSize: 13 }}>
            <Icon name="check" size={24} stroke={1.5}/>
            <div style={{ marginTop: 8 }}>All caught up — no pending insights</div>
          </div>
        )}
      </div>

      <div className="pw-grid-3" style={{ gap: 16, marginBottom: 16 }}>
        <TrendCard title="Eating out" value={384.18} delta={-9.2} desc="vs your 6-month average" data={[420, 510, 380, 460, 421, 384]}/>
        <TrendCard title="Subscriptions" value={142.88} delta={-25.1} desc="after canceling Disney+ and Headspace" data={[195, 192, 190, 188, 191, 143]}/>
        <TrendCard title="Coffee runs" value={68.40} delta={12.4} desc="up — looks like a winter pattern" data={[42, 38, 51, 56, 61, 68]}/>
      </div>

      <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-soft)', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Icon name="lock" size={16} style={{ color: 'var(--text-faint)' }}/>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', flex: 1 }}>
          Insights are generated on-device from your linked accounts. PennyWise never sells your data.
        </div>
        <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 10px', fontSize: 11.5 }}>Privacy policy</button>
      </div>
    </div>
  );
}

function InsightCard({ ins, setScreen, onDismiss }) {
  const colorMap = { warn: 'var(--warn)', pos: 'var(--pos)', info: 'var(--brand)' };
  const iconMap = { warn: 'alert', pos: 'check', info: 'sparkles' };
  const bgMap = {
    warn: 'rgba(217, 119, 6, 0.06)',
    pos: 'rgba(22, 163, 74, 0.06)',
    info: 'rgba(22, 163, 74, 0.06)',
  };
  const actionScreenMap = {
    i1: 'budgets', i2: 'cashflow', i3: 'goals', i4: 'transactions', i5: 'transactions',
  };
  const handleAction = () => {
    const dest = actionScreenMap[ins.id];
    if (dest) setScreen?.(dest);
  };
  return (
    <div className="pw-card pw-insight-card-inner" style={{ padding: 18, display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16, alignItems: 'center' }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: bgMap[ins.severity], color: colorMap[ins.severity],
        display: 'grid', placeItems: 'center',
        border: `1px solid ${colorMap[ins.severity]}30`,
      }}>
        <Icon name={iconMap[ins.severity]} size={18} stroke={2}/>
      </div>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '-0.005em' }}>{ins.title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.55 }}>{ins.body}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button className="pw-btn pw-btn-primary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={handleAction}>{ins.action}</button>
        <button className="pw-btn pw-btn-ghost" style={{ padding: '4px 12px', fontSize: 11.5 }} onClick={() => onDismiss?.(ins.id)}>Dismiss</button>
      </div>
    </div>
  );
}

function TrendCard({ title, value, delta, desc, data }) {
  const positive = delta < 0;
  return (
    <div className="pw-card" style={{ padding: 18 }}>
      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <div className="pw-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{fmt(value)}</div>
        <div className="pw-num" style={{ fontSize: 12, fontWeight: 600, color: positive ? 'var(--pos)' : 'var(--neg)' }}>
          {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--text-faint)', marginTop: 4 }}>{desc}</div>
      <div style={{ marginTop: 12 }}>
        <Sparkline data={data} width={240} height={36} stroke={positive ? 'var(--pos)' : 'var(--neg)'}/>
      </div>
    </div>
  );
}

/* ============================================================
   SHELL
   ============================================================ */
function Sidebar({ screen, setScreen, theme, onSignOut, isOpen, onClose }) {
  const overBudget = BUDGETS.filter(b => b.spent > b.budget).length;
  const items = [
    { group: 'Workspace', items: [
      { id: 'overview', label: 'Overview', icon: 'home' },
      { id: 'transactions', label: 'Transactions', icon: 'list', badge: TRANSACTIONS.length },
      { id: 'cashflow', label: 'Cashflow', icon: 'trending' },
      { id: 'ai', label: 'AI Assistant', icon: 'message-circle', badge: '✦', badgeColor: 'var(--brand)' },
    ]},
    { group: 'Planning', items: [
      { id: 'budgets', label: 'Budgets', icon: 'pie', badge: overBudget > 0 ? overBudget : null, badgeColor: 'var(--warn)' },
      { id: 'goals', label: 'Goals', icon: 'flag' },
      { id: 'insights', label: 'Insights', icon: 'sparkles', badge: INSIGHTS.length, badgeColor: 'var(--brand)' },
    ]},
    { group: 'System', items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ]},
  ];

  const logoSrc = `${import.meta.env.BASE_URL}${theme === 'dark' ? 'PennyWhite.png' : 'PennyDark.png'}`;

  return (
    <aside className={`pw-sidebar${isOpen ? ' pw-sidebar--open' : ''}`}>
      <div className="pw-brand">
        <img src={logoSrc} alt="PennyWise" style={{ height: 30, width: 'auto', objectFit: 'contain' }}/>
      </div>

      {items.map(grp => (
        <div key={grp.group}>
          <div className="pw-nav-group-label">{grp.group}</div>
          {grp.items.map(it => (
            <div key={it.id} className={`pw-nav-item ${screen === it.id ? 'active' : ''}`} onClick={() => { setScreen(it.id); onClose?.(); }}>
              <Icon name={it.icon} size={16}/>
              <span>{it.label}</span>
              {it.badge && (
                <span className="pw-badge" style={it.badgeColor ? { color: it.badgeColor, background: it.badgeColor + '15' } : {}}>
                  {it.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 16, padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-elev)' }}>
        <div style={{ fontSize: 10.5, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Net worth</div>
        <div className="pw-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>
          {fmtCompact(NET_WORTH[NET_WORTH.length - 1].v)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Icon name="arrow-up" size={10} stroke={2.5} style={{ color: 'var(--pos)' }}/>
          <span className="pw-num" style={{ fontSize: 11, color: 'var(--pos)', fontWeight: 600 }}>+2.4%</span>
          <span style={{ fontSize: 10.5, color: 'var(--text-faint)' }}>30d</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <Sparkline data={NET_WORTH.slice(-30).map(d => d.v)} width={180} height={28} stroke="var(--brand)"/>
        </div>
      </div>

      <div className="pw-sidebar-foot">
        <div className="pw-avatar">SC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Sam Chen</div>
          <div style={{ fontSize: 10.5, color: 'var(--brand)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="crown" size={10} stroke={2}/> Pro Plan
            </div>
        </div>
        <button className="pw-icon-btn" style={{ width: 26, height: 26 }} title="Sign out" onClick={onSignOut}>
          <Icon name="logout" size={13}/>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ theme, setTheme, onCmd, onAddTxn, onMenuToggle }) {
  return (
    <header className="pw-topbar">
      <button className="pw-hamburger" onClick={onMenuToggle} aria-label="Open menu">
        <Icon name="menu" size={18}/>
      </button>

      <button className="pw-search" style={{ width: 320 }} onClick={onCmd}>
        <Icon name="search" size={14}/>
        <span style={{ flex: 1, textAlign: 'left' }}>Search anything…</span>
        <span className="pw-kbd">⌘K</span>
      </button>

      <div style={{ flex: 1 }}/>

      <button className="pw-icon-btn" title="Search" onClick={onCmd} style={{ display: 'none' }} aria-label="Search">
        <Icon name="search" size={16}/>
      </button>

      <button className="pw-btn pw-btn-ghost" style={{ padding: '6px 10px' }} onClick={onAddTxn}>
        <Icon name="plus" size={14}/><span>Add</span>
      </button>

      <button className="pw-icon-btn" title="Notifications" style={{ position: 'relative' }}>
        <Icon name="bell" size={16}/>
        <span style={{ position: 'absolute', top: 7, right: 8, width: 6, height: 6, borderRadius: 3, background: 'var(--brand)', border: '1.5px solid var(--bg)' }}/>
      </button>

      <button className="pw-icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle theme">
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={16}/>
      </button>
    </header>
  );
}

function CommandPalette({ setScreen, onClose, onAddTxn, onAddGoal, onAddBudget }) {
  const [q, setQ] = useState('');
  const refIn = useRef(null);
  useEffect(() => { refIn.current?.focus(); }, []);

  const actions = [
    { id: 'overview', label: 'Go to Overview', icon: 'home', shortcut: 'G O', section: 'Navigate', run: () => setScreen('overview') },
    { id: 'transactions', label: 'Go to Transactions', icon: 'list', shortcut: 'G T', section: 'Navigate', run: () => setScreen('transactions') },
    { id: 'budgets', label: 'Go to Budgets', icon: 'pie', shortcut: 'G B', section: 'Navigate', run: () => setScreen('budgets') },
    { id: 'goals', label: 'Go to Goals', icon: 'flag', shortcut: 'G G', section: 'Navigate', run: () => setScreen('goals') },
    { id: 'cashflow', label: 'Go to Cashflow', icon: 'trending', shortcut: 'G C', section: 'Navigate', run: () => setScreen('cashflow') },
    { id: 'insights', label: 'Go to Insights', icon: 'sparkles', shortcut: 'G I', section: 'Navigate', run: () => setScreen('insights') },
    { id: 'ai', label: 'Open AI Assistant', icon: 'message-circle', shortcut: 'G A', section: 'Navigate', run: () => setScreen('ai') },
    { id: 'settings', label: 'Go to Settings', icon: 'settings', shortcut: 'G S', section: 'Navigate', run: () => setScreen('settings') },
    { id: 'add-txn', label: 'Add a transaction', icon: 'plus', section: 'Actions', run: () => onAddTxn?.() },
    { id: 'add-goal', label: 'Create a goal', icon: 'flag', section: 'Actions', run: () => onAddGoal?.() },
    { id: 'add-budget', label: 'Create a budget', icon: 'pie', section: 'Actions', run: () => onAddBudget?.() },
    { id: 'export', label: 'Export transactions CSV', icon: 'download', section: 'Actions', run: () => {} },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  const groups = filtered.reduce((acc, a) => {
    (acc[a.section] ||= []).push(a);
    return acc;
  }, {});

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      display: 'grid', placeItems: 'start center', paddingTop: '14vh',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 560, background: 'var(--bg-elev)', borderRadius: 14, border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-pop)', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <Icon name="search" size={16} style={{ color: 'var(--text-faint)' }}/>
          <input ref={refIn} value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command or search…" style={{
            flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)',
          }}/>
          <span className="pw-kbd">ESC</span>
        </div>
        <div style={{ maxHeight: 380, overflow: 'auto', padding: 6 }}>
          {Object.entries(groups).map(([sec, items]) => (
            <div key={sec}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '10px 12px 6px' }}>{sec}</div>
              {items.map(a => (
                <button key={a.id} onClick={() => { a.run(); onClose(); }} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent',
                  color: 'var(--text)', fontSize: 13, textAlign: 'left', cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Icon name={a.icon} size={14} style={{ color: 'var(--text-muted)' }}/>
                  <span style={{ flex: 1 }}>{a.label}</span>
                  {a.shortcut && <span className="pw-kbd">{a.shortcut}</span>}
                </button>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-faint)', fontSize: 13 }}>No commands match "{q}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
const AI_DATA = { CASHFLOW, NET_WORTH, BUDGETS, GOALS, TRANSACTIONS, SUBSCRIPTIONS, CATEGORIES };

/* ─── Add Transaction Modal ─── */
function AddTxnModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    merchant: '', amount: '', cat: 'groceries', account: 'cc1', date: '2025-11-25', note: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.merchant || !form.amount) return;
    const amt = parseFloat(form.amount);
    if (isNaN(amt)) return;
    onAdd({
      id: Date.now(),
      date: form.date,
      merchant: form.merchant,
      cat: form.cat,
      amount: form.cat === 'income' ? Math.abs(amt) : -Math.abs(amt),
      account: form.account,
      note: form.note || undefined,
    });
    onClose();
  };

  return (
    <div className="pw-modal-overlay" onClick={onClose}>
      <div className="pw-modal" onClick={e => e.stopPropagation()}>
        <div className="pw-modal-head">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Add transaction</div>
          <button className="pw-icon-btn" style={{ width: 28, height: 28 }} onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <form onSubmit={submit} className="pw-modal-body">
          <div className="pw-field">
            <label className="pw-field-label">Merchant</label>
            <input className="pw-field-input" value={form.merchant} onChange={e => set('merchant', e.target.value)} placeholder="e.g. Whole Foods Market" required/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="pw-field">
              <label className="pw-field-label">Amount</label>
              <input className="pw-field-input" type="number" step="0.01" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="0.00" required/>
            </div>
            <div className="pw-field">
              <label className="pw-field-label">Date</label>
              <input className="pw-field-input" type="date" value={form.date} onChange={e => set('date', e.target.value)}/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="pw-field">
              <label className="pw-field-label">Category</label>
              <select className="pw-field-input" value={form.cat} onChange={e => set('cat', e.target.value)}>
                {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
            <div className="pw-field">
              <label className="pw-field-label">Account</label>
              <select className="pw-field-input" value={form.account} onChange={e => set('account', e.target.value)}>
                {ACCOUNTS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Note <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(optional)</span></label>
            <input className="pw-field-input" value={form.note} onChange={e => set('note', e.target.value)} placeholder="Add a note…"/>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" className="pw-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="pw-btn pw-btn-primary"><Icon name="plus" size={14}/>Add transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Add Goal Modal ─── */
function AddGoalModal({ onClose }) {
  const [form, setForm] = useState({ name: '', target: '', contrib: '', due: '', icon: 'flag', color: '#16a34a' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const icons = [{ v: 'shield', l: 'Emergency' }, { v: 'plane', l: 'Travel' }, { v: 'home', l: 'Home' }, { v: 'laptop', l: 'Tech' }, { v: 'flag', l: 'Other' }];
  const colors = ['#16a34a', '#0ea5e9', '#a855f7', '#f59e0b', '#ef4444'];
  const submit = (e) => {
    e.preventDefault();
    alert(`Goal "${form.name}" created! In production, this would save to your goals.`);
    onClose();
  };
  return (
    <div className="pw-modal-overlay" onClick={onClose}>
      <div className="pw-modal" onClick={e => e.stopPropagation()}>
        <div className="pw-modal-head">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Create a goal</div>
          <button className="pw-icon-btn" style={{ width: 28, height: 28 }} onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <form onSubmit={submit} className="pw-modal-body">
          <div className="pw-field">
            <label className="pw-field-label">Goal name</label>
            <input className="pw-field-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Emergency Fund, Tokyo Trip…" required/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="pw-field">
              <label className="pw-field-label">Target amount</label>
              <input className="pw-field-input" type="number" step="100" value={form.target} onChange={e => set('target', e.target.value)} placeholder="10,000" required/>
            </div>
            <div className="pw-field">
              <label className="pw-field-label">Weekly contribution</label>
              <input className="pw-field-input" type="number" step="10" value={form.contrib} onChange={e => set('contrib', e.target.value)} placeholder="250"/>
            </div>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Target date</label>
            <input className="pw-field-input" type="date" value={form.due} onChange={e => set('due', e.target.value)}/>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Icon</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {icons.map(ic => (
                <button key={ic.v} type="button" onClick={() => set('icon', ic.v)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 10px',
                  border: `1.5px solid ${form.icon === ic.v ? 'var(--brand)' : 'var(--border)'}`,
                  borderRadius: 10, background: form.icon === ic.v ? 'var(--brand-soft)' : 'var(--bg-soft)',
                  cursor: 'pointer', flex: 1, color: form.icon === ic.v ? 'var(--brand)' : 'var(--text-muted)',
                }}>
                  <Icon name={ic.v} size={16}/>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-body)' }}>{ic.l}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Color</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {colors.map(c => (
                <button key={c} type="button" onClick={() => set('color', c)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
                  border: form.color === c ? `3px solid var(--text)` : '3px solid transparent',
                  boxShadow: `0 0 0 1px ${c}`,
                }}/>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" className="pw-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="pw-btn pw-btn-primary"><Icon name="flag" size={14}/>Create goal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Contribute Modal ─── */
function ContributeModal({ goal, onClose }) {
  const [amount, setAmount] = useState(goal?.contrib || '');
  const presets = goal ? [goal.contrib, goal.contrib * 2, Math.round((goal.target - goal.current) / 4)] : [];
  const submit = (e) => {
    e.preventDefault();
    alert(`${goal?.name}: $${amount} contribution recorded! Your new balance would be ${fmt((goal?.current || 0) + parseFloat(amount || 0), { decimals: 0 })}.`);
    onClose();
  };
  if (!goal) return null;
  const remaining = goal.target - goal.current;
  const afterContrib = goal.current + parseFloat(amount || 0);
  return (
    <div className="pw-modal-overlay" onClick={onClose}>
      <div className="pw-modal" onClick={e => e.stopPropagation()}>
        <div className="pw-modal-head">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Contribute to goal</div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 2 }}>{goal.name}</div>
          </div>
          <button className="pw-icon-btn" style={{ width: 28, height: 28 }} onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <form onSubmit={submit} className="pw-modal-body">
          <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-faint)', marginBottom: 8 }}>
              <span>Current</span><span>Target</span>
            </div>
            <div className="pw-bar" style={{ height: 8 }}>
              <div className="pw-bar-fill" style={{ width: `${Math.min(100, (afterContrib / goal.target) * 100)}%`, background: goal.color, transition: 'width 0.3s var(--ease-out)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginTop: 6 }}>
              <span className="pw-num" style={{ fontWeight: 600 }}>{fmt(afterContrib, { decimals: 0 })}</span>
              <span style={{ color: 'var(--text-faint)' }}>{fmt(remaining - parseFloat(amount || 0), { decimals: 0 })} remaining</span>
            </div>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Amount</label>
            <input className="pw-field-input" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required/>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {presets.filter((v, i, a) => a.indexOf(v) === i && v > 0).slice(0, 3).map(p => (
              <button key={p} type="button" className="pw-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }} onClick={() => setAmount(p)}>
                {fmt(p, { decimals: 0 })}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" className="pw-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="pw-btn pw-btn-primary"><Icon name="plus" size={14}/>Contribute</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Add Budget Modal ─── */
function AddBudgetModal({ onClose }) {
  const existingCats = new Set(BUDGETS.map(b => b.cat));
  const availableCats = Object.entries(CATEGORIES).filter(([k]) => !existingCats.has(k) && k !== 'income' && k !== 'transfer');
  const [form, setForm] = useState({ cat: availableCats[0]?.[0] || 'travel', budget: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    alert(`Budget for ${CATEGORIES[form.cat]?.name} set at ${fmt(parseFloat(form.budget), { decimals: 0 })}/month.`);
    onClose();
  };
  return (
    <div className="pw-modal-overlay" onClick={onClose}>
      <div className="pw-modal" onClick={e => e.stopPropagation()}>
        <div className="pw-modal-head">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>New budget</div>
          <button className="pw-icon-btn" style={{ width: 28, height: 28 }} onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <form onSubmit={submit} className="pw-modal-body">
          <div className="pw-field">
            <label className="pw-field-label">Category</label>
            <select className="pw-field-input" value={form.cat} onChange={e => set('cat', e.target.value)}>
              {availableCats.map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              <optgroup label="Already budgeted">
                {BUDGETS.map(b => <option key={b.cat} value={b.cat} disabled>{CATEGORIES[b.cat]?.name} (active)</option>)}
              </optgroup>
            </select>
          </div>
          <div className="pw-field">
            <label className="pw-field-label">Monthly limit</label>
            <input className="pw-field-input" type="number" step="10" value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. 400" required/>
          </div>
          {form.budget && !isNaN(parseFloat(form.budget)) && (
            <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--brand-soft)', border: '1px solid var(--brand-rim)', fontSize: 12.5, color: 'var(--text-muted)' }}>
              <span className="pw-num" style={{ fontWeight: 600, color: 'var(--brand)' }}>{fmt(parseFloat(form.budget) / 30.4, { decimals: 0 })}/day</span>
              {' '}safe-to-spend for <strong>{CATEGORIES[form.cat]?.name}</strong>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" className="pw-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="pw-btn pw-btn-primary"><Icon name="plus" size={14}/>Create budget</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardApp({ onSignOut }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  const [accent, setAccent] = useState('green');
  const [screen, setScreen] = useState('overview');
  const [range, setRange] = useState('3M');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTxn, setShowAddTxn] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [contributeGoal, setContributeGoal] = useState(null);
  const [txns, setTxns] = useState(TRANSACTIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleExportCSV = (data) => {
    const rows = [
      ['Date', 'Merchant', 'Category', 'Amount', 'Account', 'Note'],
      ...(data || txns).map(t => [
        t.date, t.merchant, CATEGORIES[t.cat]?.name || t.cat,
        t.amount, ACCOUNTS.find(a => a.id === t.account)?.name || t.account, t.note || '',
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'pennywise-transactions.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Apply theme to <html> and sync Tailwind .dark class
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    return () => {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    };
  }, [theme]);

  // Apply accent color override
  useEffect(() => {
    const root = document.documentElement;
    if (accent === 'green') root.removeAttribute('data-accent');
    else root.setAttribute('data-accent', accent);
    return () => root.removeAttribute('data-accent');
  }, [accent]);

  // Command palette + G-key navigation
  useEffect(() => {
    let lastG = false;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
        return;
      }
      if (e.key === 'Escape') { setCmdOpen(false); setShowAddTxn(false); setShowAddGoal(false); setShowAddBudget(false); setContributeGoal(null); return; }
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (lastG) {
        const map = { o: 'overview', t: 'transactions', b: 'budgets', g: 'goals', c: 'cashflow', i: 'insights', a: 'ai', s: 'settings' };
        if (map[e.key]) setScreen(map[e.key]);
        lastG = false;
        return;
      }
      if (e.key === 'g') lastG = true;
      setTimeout(() => { lastG = false; }, 800);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleAddTxn = (t) => setTxns(prev => [t, ...prev]);

  return (
    <>
      <div className="pw-app">
        {sidebarOpen && <div className="pw-sidebar-overlay" onClick={() => setSidebarOpen(false)}/>}
        <Sidebar screen={screen} setScreen={setScreen} theme={theme} onSignOut={onSignOut} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <div className="pw-main">
          <Topbar theme={theme} setTheme={setTheme} onCmd={() => setCmdOpen(true)} onAddTxn={() => setShowAddTxn(true)} onMenuToggle={() => setSidebarOpen(o => !o)}/>
          <div className="pw-workspace">
            {screen === 'overview' && <Overview range={range} setRange={setRange} txns={txns} setScreen={setScreen} onAddTxn={() => setShowAddTxn(true)} onAddGoal={() => setShowAddGoal(true)} onExport={handleExportCSV}/>}
            {screen === 'transactions' && <Transactions txns={txns} onAddTxn={() => setShowAddTxn(true)} onExport={handleExportCSV}/>}
            {screen === 'budgets' && <Budgets onAddBudget={() => setShowAddBudget(true)}/>}
            {screen === 'goals' && <Goals onAddGoal={() => setShowAddGoal(true)} onContribute={setContributeGoal}/>}
            {screen === 'cashflow' && <Cashflow onExport={handleExportCSV} setScreen={setScreen}/>}
            {screen === 'insights' && <Insights setScreen={setScreen}/>}
            {screen === 'ai' && <AIAssistant data={AI_DATA}/>}
            {screen === 'settings' && <Settings theme={theme} setTheme={setTheme} accent={accent} setAccent={setAccent}/>}
          </div>
        </div>
      </div>
      {cmdOpen && <CommandPalette setScreen={setScreen} onClose={() => setCmdOpen(false)} onAddTxn={() => { setShowAddTxn(true); setCmdOpen(false); }} onAddGoal={() => { setShowAddGoal(true); setCmdOpen(false); }} onAddBudget={() => { setShowAddBudget(true); setCmdOpen(false); }}/>}
      {showAddTxn && <AddTxnModal onClose={() => setShowAddTxn(false)} onAdd={handleAddTxn}/>}
      {showAddGoal && <AddGoalModal onClose={() => setShowAddGoal(false)}/>}
      {showAddBudget && <AddBudgetModal onClose={() => setShowAddBudget(false)}/>}
      {contributeGoal && <ContributeModal goal={GOALS.find(g => g.id === contributeGoal)} onClose={() => setContributeGoal(null)}/>}
    </>
  );
}
