import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  page.once('dialog', (dialog) => dialog.accept());
  await page.reload();
});

test('Assert manager can open account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();

  await page.locator('#userSelect').selectOption({
    label: `${firstName} ${lastName}`,
  });

  await openAccountPage.currencyDropdown.selectOption({ label: 'Dollar' });

  await page.getByRole('button', { name: 'Process' }).click();

  page.once('dialog', (dialog) => dialog.accept());
  await page.reload();

  await customersListPage.open();

  const lastRow = page.getByRole('row').last();

  await expect(lastRow).toContainText(firstName);
  await expect(lastRow).toContainText(lastName);
  await expect(lastRow.getByRole('cell').nth(3)).not.toBeEmpty();
});