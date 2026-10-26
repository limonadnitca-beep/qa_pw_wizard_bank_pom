import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  page.once('dialog', (dialog) => dialog.accept());
  await page.reload();

  await customersListPage.open();

  const lastRow = page.getByRole('row').last();

  await expect(lastRow).toContainText(firstName);
  await expect(lastRow).toContainText(lastName);
  await expect(lastRow).toContainText(postCode);

  const accountNumberCell = lastRow.getByRole('cell').nth(3);
  await expect(accountNumberCell).toBeEmpty();
});