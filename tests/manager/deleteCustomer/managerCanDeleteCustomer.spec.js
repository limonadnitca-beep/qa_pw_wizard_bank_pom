import { test } from '@playwright/test';
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

  page.once('dialog', (dialog) => dialog.accept());

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
  await page.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();

  await customersListPage.assertCustomerExists(firstName, lastName);
  await customersListPage.deleteCustomer(firstName, lastName);
  await customersListPage.assertCustomerDoesNotExist(firstName, lastName);

  await page.reload();

  await customersListPage.assertCustomerDoesNotExist(firstName, lastName);
});