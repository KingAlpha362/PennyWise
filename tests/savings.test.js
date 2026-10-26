import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSavings } from '../src/lib/savings.js';
test('default scenario rounds each category before annualizing', () => {
  assert.deepEqual(calculateSavings(600, 180, 500), { diningOverspend: 132, subsSavings: 68, shoppingSavings: 90, total: 290, annualSavings: 3480 });
});
test('zero spending gives zero, with no infinite return value', () => {
  assert.equal(calculateSavings(0, 0, 0).total, 0);
  assert.equal(calculateSavings(0, 0, 0).annualSavings, 0);
});
test('maximum sliders annualize correctly', () => {
  assert.equal(calculateSavings(2000, 600, 2000).total, 1028);
  assert.equal(calculateSavings(2000, 600, 2000).annualSavings, 12336);
});
test('invalid and negative inputs do not leak NaN or negative savings', () => {
  assert.equal(calculateSavings(-1, NaN, Infinity).total, 0);
});
