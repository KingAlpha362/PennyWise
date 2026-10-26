export function summarizeMonth(transactions, month = '2025-11') {
  const monthly = transactions.filter(t => t.date.startsWith(month));
  const income = monthly.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = monthly.filter(t => t.amount < 0).reduce((sum, t) => sum - t.amount, 0);
  const categories = new Map();
  monthly.filter(t => t.amount < 0).forEach(t => categories.set(t.cat, (categories.get(t.cat) || 0) - t.amount));
  return { income, expenses, breakdown: [...categories].map(([cat, amount]) => ({ cat, amount })).sort((a, b) => b.amount - a.amount) };
}
export function updateBudgets(budgets, transactions) {
  return budgets.map(b => {
    const matches = transactions.filter(t => t.cat === b.cat && t.amount < 0 && t.date.startsWith('2025-11'));
    return { ...b, spent: matches.reduce((sum, t) => sum - t.amount, 0), txns: matches.length };
  });
}
