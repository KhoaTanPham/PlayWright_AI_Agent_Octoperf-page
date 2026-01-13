import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async login(username: string, password: string) {
    // Robustly locate username field
    const userSelectors = ['input[name="username"]', 'input#username', 'input[name="j_username"]', 'input[name="userid"]', 'input[name*="user"]', 'input[type="text"]'];
    for (const sel of userSelectors) {
      const loc = this.page.locator(sel).first();
      if (await loc.count() > 0) {
        try { await loc.fill(username); } catch (e) {}
        break;
      }
    }
    // Robustly locate password field
    const passSelectors = ['input[name="password"]', 'input#password', 'input[name="j_password"]', 'input[type="password"]', 'input[name*="pass"]'];
    for (const sel of passSelectors) {
      const loc = this.page.locator(sel).first();
      if (await loc.count() > 0) {
        try { await loc.fill(password); } catch (e) {}
        break;
      }
    }
    // Submit: prefer button click, otherwise try form submit
    const btn = this.page.getByRole('button', { name: /Login|Sign in|Sign In|Log in|Submit/i }).first();
    if (await btn.count() > 0) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
        btn.click(),
      ]);
    } else {
      const form = this.page.locator('form[action*="Account.action"], form').first();
      if (await form.count() > 0) {
        await form.evaluate((f: HTMLFormElement) => (f as HTMLFormElement).submit());
        await this.page.waitForLoadState('networkidle').catch(() => {});
      }
    }
  }
}
