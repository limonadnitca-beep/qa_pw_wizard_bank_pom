export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
}