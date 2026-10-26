import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rows = page.getByRole('row');
    this.searchInput = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastRowContainsText(text) {
    await expect(this.rows.last()).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.rows.last().getByRole('cell').nth(3)).toBeEmpty();
  }

  async findCustomerRow(firstName, lastName) {
    return this.rows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
  }

  async deleteCustomer(firstName, lastName) {
    const customerRow = await this.findCustomerRow(firstName, lastName);
    await customerRow.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerExists(firstName, lastName) {
    const customerRow = await this.findCustomerRow(firstName, lastName);
    await expect(customerRow).toHaveCount(1);
  }

  async assertCustomerDoesNotExist(firstName, lastName) {
    const customerRow = await this.findCustomerRow(firstName, lastName);
    await expect(customerRow).toHaveCount(0);
  }

  async searchCustomer(searchText) {
    await this.searchInput.fill(searchText);
  }

  async assertCustomerSearchResults(firstName, lastName) {
    const customerRows = this.rows.filter({ hasText: firstName });

    await expect(customerRows).toHaveCount(1);
    await expect(customerRows.first()).toContainText(lastName);
    await expect(this.rows).toHaveCount(2);
  }

  async assertCustomerSearchByPostalCode(firstName, lastName, postalCode) {
    const customerRows = this.rows.filter({ hasText: postalCode });

    await expect(customerRows).toHaveCount(1);
    await expect(customerRows.first()).toContainText(firstName);
    await expect(customerRows.first()).toContainText(lastName);
    await expect(this.rows).toHaveCount(2);
  }
}