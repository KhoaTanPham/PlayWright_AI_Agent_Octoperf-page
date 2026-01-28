import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Locators
  get enterStoreLink() { return this.page.getByRole('link', { name: 'Enter the Store' }); }
  get welcomeHeading() { return this.page.getByRole('heading', { name: 'Welcome to JPetStore 6' }); }

  // Methods
  async navigate() {
    await this.page.goto('https://petstore.octoperf.com/');
  }

  async enterStore() {
    await this.enterStoreLink.click();
  }

  async verifyPageLoaded() {
    await expect(this.welcomeHeading).toBeVisible();
  }
}