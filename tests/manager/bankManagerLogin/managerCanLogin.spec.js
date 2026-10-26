import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();

  await expect(page.getByRole('button', { name: 'Add Customer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Account' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Customers' })).toBeVisible();
});
