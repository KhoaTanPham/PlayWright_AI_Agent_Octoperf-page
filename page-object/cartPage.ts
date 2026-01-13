import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    const roleLink = this.page.getByRole('link', { name: /Cart|My Cart|Shopping Cart/i }).first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      return;
    }
    const hrefLink = this.page.locator('a[href*="Cart.action"], a[href*="cart"]');
    if (await hrefLink.count() > 0) {
      await hrefLink.first().click();
      return;
    }
    // Fallback: navigate directly to known cart URL
    await this.page.goto('https://petstore.octoperf.com/actions/Cart.action?viewCart=');
  }
  async getQuantityForItem(name: string) {
    const locator = this.page.locator(`text=${name}`).locator('..').locator('input[type="number"], input[name="quantity"]');
    return locator.inputValue();
  }
}
