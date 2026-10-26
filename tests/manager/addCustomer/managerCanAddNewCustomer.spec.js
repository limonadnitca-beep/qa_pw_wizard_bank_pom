import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  page.once('dialog', (dialog) => dialog.accept());

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
  await page.reload();

  await customersListPage.open();

  await customersListPage.assertLastRowContainsText(firstName);
  await customersListPage.assertLastRowContainsText(lastName);
  await customersListPage.assertLastRowContainsText(postCode);
  await customersListPage.assertLastRowAccountNumberIsEmpty();
});