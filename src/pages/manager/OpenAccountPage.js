import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropdown = page.locator('#userSelect');
    this.currencyDropdown = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async assertCurrencyIsSelected(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }

  async openAccount(customerName, currency) {
    await this.customerDropdown.selectOption({ label: customerName });
    await this.selectCurrency(currency);
    await this.processButton.click();
  }
}