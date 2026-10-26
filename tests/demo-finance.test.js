import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeMonth, updateBudgets } from '../src/lib/demo-finance.js';
const transactions = [
  { date: '2025-11-25', cat: 'income', amount: 1000 },
  { date: '2025-11-25', cat: 'dining', amount: -12.34 },
  { date: '2025-10-25', cat: 'dining', amount: -99 },
];
test('monthly totals and category chart agree and exclude other months', () => {
  const result = summarizeMonth(transactions);
  assert.equal(result.income, 1000); assert.equal(result.expenses, 12.34);
  assert.equal(result.breakdown.reduce((sum, c) => sum + c.amount, 0), result.expenses);
});
test('transaction additions update budgets without mutating their source', () => {
  const budgets = [{ cat: 'dining', budget: 100, spent: 0 }];
  const updated = updateBudgets(budgets, [...transactions, { date: '2025-11-25', cat: 'dining', amount: -10 }]);
  assert.equal(updated[0].spent, 22.34); assert.equal(updated[0].txns, 2); assert.equal(budgets[0].spent, 0);
});
test('empty month returns zero totals and an empty chart', () => { assert.deepEqual(summarizeMonth([]), { income: 0, expenses: 0, breakdown: [] }); });
