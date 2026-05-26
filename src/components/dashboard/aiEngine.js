/* ============================================================
   AI RESPONSE ENGINE
   Simulates an AI financial assistant using static mock data.
   ============================================================ */

const fmt = (v) => {
  const a = Math.abs(v);
  const n = a.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return `${v < 0 ? '−' : ''}$${n}`;
};

export function generateResponse(message, data) {
  const msg = message.toLowerCase();
  const { CASHFLOW, NET_WORTH, BUDGETS, GOALS, TRANSACTIONS, SUBSCRIPTIONS, CATEGORIES } = data;

  const latest = NET_WORTH[NET_WORTH.length - 1].v;
  const prior = NET_WORTH[NET_WORTH.length - 31].v;
  const monthDelta = latest - prior;
  const thisMonth = CASHFLOW[CASHFLOW.length - 1];
  const lastMonth = CASHFLOW[CASHFLOW.length - 2];
  const netSavings = thisMonth.income - thisMonth.expenses;
  const savingsRate = ((netSavings / thisMonth.income) * 100).toFixed(1);

  const overBudget = BUDGETS.filter(b => b.spent > b.budget);
  const nearBudget = BUDGETS.filter(b => b.spent / b.budget >= 0.85 && b.spent <= b.budget);

  /* ── Summarize / how am I doing */
  if (/summar|how am i|overview|financial|situation|doing|check in/.test(msg)) {
    const topIssues = overBudget.map(b => {
      const cat = CATEGORIES[b.cat];
      const overpct = Math.round(((b.spent - b.budget) / b.budget) * 100);
      return `${cat.name} (+${overpct}%)`;
    });
    const goalOnTrack = GOALS.filter(g => {
      const monthsLeft = Math.max(1, Math.round((new Date(g.due) - new Date('2025-11-25')) / (1000 * 60 * 60 * 24 * 30)));
      const needed = (g.target - g.current) / monthsLeft;
      return g.contrib >= needed;
    });
    const tokyo = GOALS.find(g => g.id === 'g2');
    const tokyoPct = tokyo ? Math.round((tokyo.current / tokyo.target) * 100) : null;
    return `Here's where you stand, Sam:

**Net worth:** ${fmt(latest)} — up ${fmt(monthDelta)} this month (${((monthDelta / prior) * 100).toFixed(1)}% gain).

**Cash flow:** ${fmt(thisMonth.income)} income, ${fmt(thisMonth.expenses)} spent — you saved **${fmt(netSavings)}** (${savingsRate}% savings rate).

${overBudget.length > 0 ? `⚠️ **Overspending:** ${topIssues.join(', ')} — these categories went over budget this month.` : '✅ All budgets are on track this month.'}

**Goals:** ${goalOnTrack.length}/${GOALS.length} goals are on pace.${tokyoPct !== null ? ` Tokyo trip is ${tokyoPct}% funded.` : ''}

Overall, your finances are healthy — the main area to watch is ${overBudget.length > 0 ? CATEGORIES[overBudget[0].cat].name : 'nothing critical'}.`;
  }

  /* ── Overspending */
  if (/overspend|too much|over budget|went over|exceed/.test(msg)) {
    if (overBudget.length === 0) {
      return `Great news — you haven't gone over budget in any category this month! You do have ${nearBudget.length} categor${nearBudget.length === 1 ? 'y' : 'ies'} approaching their limit: ${nearBudget.map(b => CATEGORIES[b.cat].name).join(', ')}.`;
    }
    const sorted = [...overBudget].sort((a, b) => (b.spent - b.budget) - (a.spent - a.budget));
    const lines = sorted.map(b => {
      const cat = CATEGORIES[b.cat];
      const over = b.spent - b.budget;
      const pct = Math.round((over / b.budget) * 100);
      return `• **${cat.name}:** ${fmt(b.spent)} spent vs ${fmt(b.budget)} budget — **${fmt(over)} over** (+${pct}%)`;
    }).join('\n');
    return `You've gone over budget in ${overBudget.length} categor${overBudget.length === 1 ? 'y' : 'ies'} this month:\n\n${lines}\n\nThe biggest culprit is **${CATEGORIES[sorted[0].cat].name}**. Want me to suggest an adjusted budget?`;
  }

  /* ── Goals */
  if (/goal|saving for|target|milestone|progress/.test(msg)) {
    const lines = GOALS.map(g => {
      const pct = Math.round((g.current / g.target) * 100);
      const monthsLeft = Math.max(1, Math.round((new Date(g.due) - new Date('2025-11-25')) / (1000 * 60 * 60 * 24 * 30)));
      const needed = (g.target - g.current) / monthsLeft;
      const status = g.contrib >= needed ? '✅ On track' : '⚠️ Behind';
      return `• **${g.name}** — ${pct}% funded (${fmt(g.current)} / ${fmt(g.target)}) — ${status}`;
    }).join('\n');
    const tokyo = GOALS.find(g => g.id === 'g2');
    return `Here's a snapshot of all your goals:\n\n${lines}\n\n${tokyo ? `🗼 Tokyo trip highlight: you need ${fmt(tokyo.target - tokyo.current)} more. At your current ${fmt(tokyo.contrib)}/mo contribution you'll hit your target right on time for the March deadline.` : ''}`;
  }

  /* ── Dining / food */
  if (/dining|restaurant|food|eat|cafe|coffee/.test(msg)) {
    const diningTxns = TRANSACTIONS.filter(t => t.cat === 'dining');
    const total = diningTxns.reduce((s, t) => s + Math.abs(t.amount), 0);
    const diningBudget = BUDGETS.find(b => b.cat === 'dining');
    const over = diningBudget ? total > diningBudget.budget : false;
    const top3 = diningTxns.slice(0, 3).map(t => `${t.merchant} (${fmt(-t.amount)})`).join(', ');
    return `Your dining spend this month: **${fmt(total)}** across ${diningTxns.length} transactions.${diningBudget ? `\n\nBudget: ${fmt(diningBudget.budget)} — you're **${over ? `${fmt(total - diningBudget.budget)} over` : `${fmt(diningBudget.budget - total)} under`}**.` : ''}\n\nTop spots: ${top3}.\n\nDining is ${over ? 'your biggest budget blowout this month' : 'within range — keep it up'}.`;
  }

  /* ── Subscriptions */
  if (/subscript|netflix|spotify|recurring|cancel|bills/.test(msg)) {
    const sorted = [...SUBSCRIPTIONS].sort((a, b) => b.amount - a.amount);
    const subTotal = SUBSCRIPTIONS.reduce((s, x) => s + x.amount, 0);
    const lines = SUBSCRIPTIONS.map(s => `• **${s.name}** — $${s.amount.toFixed(2)}/mo`).join('\n');
    return `You have ${SUBSCRIPTIONS.length} active subscriptions totaling **$${subTotal.toFixed(2)}/month** — that's **$${(subTotal * 12).toFixed(0)}/year**.\n\n${lines}\n\nThe priciest is **${sorted[0].name}** at $${sorted[0].amount}/mo. Want me to flag any that look unused?`;
  }

  /* ── Cashflow / income */
  if (/cash.?flow|income|earn|revenue|paycheck|salary/.test(msg)) {
    const netThis = thisMonth.income - thisMonth.expenses;
    const netLast = lastMonth.income - lastMonth.expenses;
    const trending = netThis > netLast ? 'up' : 'down';
    return `**${thisMonth.m} ${thisMonth.y} cash flow:**\n\n• Income: **${fmt(thisMonth.income)}**\n• Expenses: **${fmt(thisMonth.expenses)}**\n• Net: **${fmt(netThis)}** (${savingsRate}% savings rate)\n\nThat's ${trending} from ${lastMonth.m} (was ${fmt(netLast)} net). ${netThis > 2000 ? 'Solid month — you\'re building a healthy cushion.' : 'Tight month — expenses are eating into savings.'}`;
  }

  /* ── Can I save more */
  if (/save more|afford|cut back|reduce|budget more/.test(msg)) {
    const totalOverspend = overBudget.reduce((s, b) => s + (b.spent - b.budget), 0);
    const shoppingBudget = BUDGETS.find(b => b.cat === 'shopping');
    const shoppingOver = shoppingBudget ? shoppingBudget.spent - shoppingBudget.budget : 161;
    return `Based on your current spending, here are 3 ways to save more:\n\n1. **Bring Shopping to budget** — you're ${fmt(shoppingOver)} over. That alone recovers ${fmt(shoppingOver)}/mo.\n\n2. **Trim subscriptions** — canceling 2-3 lower-use subs could free up ~$50-80/mo.\n\n3. **Reduce dining frequency** — dropping from ${TRANSACTIONS.filter(t => t.cat === 'dining').length} dining transactions to 8/month saves ~$90.\n\nPotential monthly savings: **${fmt(totalOverspend + 65)}** — which at your current savings rate means an extra **${fmt((totalOverspend + 65) * 12)}/year**.`;
  }

  /* ── Net worth */
  if (/net.?worth|wealth|assets|balance sheet/.test(msg)) {
    const totalAssets = 4382.17 + 28450 + 47218.93 + 92847.30;
    const totalDebt = 1842.55 + 312.40;
    return `**Your net worth breakdown:**\n\n**Assets:** ${fmt(totalAssets)}\n• Brokerage: ${fmt(47218.93)}\n• 401(k): ${fmt(92847.30)}\n• High-yield savings: ${fmt(28450)}\n• Checking: ${fmt(4382.17)}\n\n**Liabilities:** ${fmt(totalDebt)}\n• Sapphire Reserve: ${fmt(1842.55)}\n• Apple Card: ${fmt(312.40)}\n\n**Net:** ${fmt(latest)} — up ${fmt(monthDelta)} this month. Your investment accounts are doing the heavy lifting.`;
  }

  /* ── Fallback */
  return `I can help with that! Here are some things you can ask me:\n\n• **"Summarize my finances"** — full monthly snapshot\n• **"What do I overspend on?"** — budget analysis\n• **"How are my goals tracking?"** — goal progress\n• **"Show me my subscriptions"** — recurring costs\n• **"Can I save more?"** — savings opportunities\n• **"What's my cash flow?"** — income vs expenses\n\nWhat would you like to dig into?`;
}

export function buildAISummary(data) {
  const { NET_WORTH, BUDGETS, GOALS, CATEGORIES } = data;

  const latest = NET_WORTH[NET_WORTH.length - 1].v;
  const prior = NET_WORTH[NET_WORTH.length - 31].v;
  const monthDelta = latest - prior;
  const fmtShort = (v) => {
    const a = Math.abs(v);
    if (a >= 1000) return `$${(a / 1000).toFixed(1)}k`;
    return `$${a.toFixed(0)}`;
  };

  const overBudget = BUDGETS.filter(b => b.spent > b.budget);
  const topIssue = [...overBudget].sort((a, b) => (b.spent - b.budget) / b.budget - (a.spent - a.budget) / a.budget)[0];

  const tokyo = GOALS.find(g => g.id === 'g2');
  const tokyoPct = tokyo ? Math.round((tokyo.current / tokyo.target) * 100) : null;

  let summary = `Your net worth grew ${fmtShort(monthDelta)} this month.`;
  if (overBudget.length > 0 && topIssue) {
    const cat = CATEGORIES[topIssue.cat];
    const pct = Math.round(((topIssue.spent - topIssue.budget) / topIssue.budget) * 100);
    summary += ` You're overspending on ${cat.name} (+${pct}%)${overBudget.length > 1 ? ` and ${overBudget.length - 1} other ${overBudget.length - 1 === 1 ? 'category' : 'categories'}` : ''}.`;
  }
  if (tokyoPct !== null && tokyo) {
    summary += ` Tokyo trip goal is ${tokyoPct}% done — on track for ${new Date(tokyo.due).toLocaleDateString('en-US', { month: 'short' })}.`;
  }

  return summary;
}
