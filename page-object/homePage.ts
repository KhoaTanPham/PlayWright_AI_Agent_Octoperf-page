import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://petstore.octoperf.com/');
  }
  async gotoCatalog() {
    await this.page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  }
  async goToLogin() {
    const roleLink = this.page.getByRole('link', { name: /Sign in|Login|Sign In|Log in/i }).first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      return;
    }
    const hrefLink = this.page.locator('a[href*="Account.action"], a[href*="signonForm"], a[href*="login"], a[href*="signin"], a[href*="signIn"]');
    if (await hrefLink.count() > 0) {
      await hrefLink.first().click();
      return;
    }
    // Fallback: navigate directly to known sign-in URL
    await this.page.goto('https://petstore.octoperf.com/actions/Account.action?signonForm=');
  }
  async openCategory(name: string) {
    // Prefer clicking specific category controls (area or anchor) before broad fallbacks
    const upper = name.toUpperCase();
    const areaLocator = this.page.locator(`area[alt*="${name}"], area[alt*="${upper}"]`);
    if (await areaLocator.count() > 0) {
      const href = await areaLocator.first().getAttribute('href');
      if (href) {
        const base = 'https://petstore.octoperf.com';
        const url = href.startsWith('http') ? href : (href.startsWith('/') ? new URL(href, base).toString() : new URL('/actions/' + href.replace(/^\/+/, ''), base).toString());
        await this.page.goto(url);
        return;
      }
    }
    const categoryAnchor = this.page.locator(`a[href*="categoryId=${upper}"]`);
    if (await categoryAnchor.count() > 0) {
      const href = await categoryAnchor.first().getAttribute('href');
      if (href) {
        const base = 'https://petstore.octoperf.com';
        const url = href.startsWith('http') ? href : (href.startsWith('/') ? new URL(href, base).toString() : new URL('/actions/' + href.replace(/^\/+/, ''), base).toString());
        await this.page.goto(url);
        return;
      }
    }
    // Broad fallback: link by visible name
    const roleLink = this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      return;
    }
    throw new Error(`Category link for "${name}" not found`);
  }
}
