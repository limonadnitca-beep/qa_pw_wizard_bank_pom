import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);

  page.once('dialog', (dialog) => dialog.accept());
  await page.reload();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();

  const searchInput = page.getByPlaceholder('Search Customer');
  await searchInput.fill(firstName);

  const customerRows = page.getByRole('row').filter({
    hasText: firstName,
  });

  await expect(customerRows).toHaveCount(1);
  await expect(customerRows.first()).toContainText(lastName);
  await expect(page.getByRole('row')).toHaveCount(2);
});