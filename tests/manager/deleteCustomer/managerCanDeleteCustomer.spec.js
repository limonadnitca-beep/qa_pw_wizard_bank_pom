import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
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

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();

  const customerRow = page.getByRole('row').filter({
    hasText: firstName,
  }).filter({
    hasText: lastName,
  });

  await expect(customerRow).toHaveCount(1);

  await customerRow.getByRole('button', { name: 'Delete' }).click();

  await expect(customerRow).toHaveCount(0);

  await page.reload();

  const deletedCustomerRow = page.getByRole('row').filter({
    hasText: firstName,
  }).filter({
    hasText: lastName,
  });

  await expect(deletedCustomerRow).toHaveCount(0);
});