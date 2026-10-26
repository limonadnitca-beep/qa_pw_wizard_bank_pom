import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);

  page.once('dialog', (dialog) => dialog.accept());

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  await page.reload();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.searchCustomer(postalCode);
  await customersListPage.assertCustomerSearchByPostalCode(
    firstName,
    lastName,
    postalCode,
  );
});