import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();

  await openAccountPage.currencyDropdown.selectOption({ label: 'Dollar' });
  await expect(openAccountPage.currencyDropdown).toHaveValue('Dollar');

  await openAccountPage.currencyDropdown.selectOption({ label: 'Pound' });
  await expect(openAccountPage.currencyDropdown).toHaveValue('Pound');

  await openAccountPage.currencyDropdown.selectOption({ label: 'Rupee' });
  await expect(openAccountPage.currencyDropdown).toHaveValue('Rupee');
});
