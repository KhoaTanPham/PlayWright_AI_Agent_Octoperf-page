import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  get usernameInput() { return this.page.locator('input[name="username"]'); }
  get passwordInput() { return this.page.locator('input[name="password"]'); }
  get loginButton() { return this.page.getByRole('button', { name: 'Login' }); }
  get loginFormText() { return this.page.getByText('Please enter your username and password.'); }
  get registerLink() { return this.page.getByRole('link', { name: 'Register Now!' }); }

  // Methods
  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async loginWith(username: string, password: string) {
    await this.fillCredentials(username, password);
    await this.submitLogin();
  }

  async verifyLoginPageDisplayed() {
    await expect(this.loginFormText).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async handleLoginAlert() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }
}