// Illustrative scenario assumptions, not measured customer outcomes.
export function calculateSavings(dining, subscriptions, shopping) {
  const safe = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  const diningOverspend = Math.round(safe(dining) * 0.22);
  const subsSavings = Math.round(safe(subscriptions) * 0.38);
  const shoppingSavings = Math.round(safe(shopping) * 0.18);
  const total = diningOverspend + subsSavings + shoppingSavings;
  return { diningOverspend, subsSavings, shoppingSavings, total, annualSavings: total * 12 };
}
