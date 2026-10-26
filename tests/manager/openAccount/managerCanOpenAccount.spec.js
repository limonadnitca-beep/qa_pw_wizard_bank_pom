import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();

  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertCurrencyIsSelected('Dollar');

  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.assertCurrencyIsSelected('Pound');

  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.assertCurrencyIsSelected('Rupee');
});