import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  // Locators
  get productTitle() { return this.page.locator('h2'); }
  get itemTable() { return this.page.locator('table'); }
  get returnToCategoryLink() { return this.page.locator('a[href*="viewCategory"]').first(); }
  
  // Add to Cart buttons for different items
  get addToCartButtons() { return this.page.getByRole('link', { name: 'Add to Cart' }); }
  
  // Specific item links
  get itemLinks() { return this.page.locator('a[href*="viewItem"]'); }

  // Methods
  async verifyProductPage(productName: string) {
    await expect(this.productTitle).toContainText(productName);
    await expect(this.itemTable).toBeVisible();
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addItemToCart(itemId: string) {
    await this.page.getByRole('link', { name: 'Add to Cart' }).filter({ has: this.page.locator(`text=${itemId}`) }).first().click();
  }

  async clickItemDetails(itemId: string) {
    await this.page.getByRole('link', { name: itemId }).click();
  }

  async verifyItemsDisplayed() {
    const itemCount = await this.addToCartButtons.count();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifyItemDetails(itemId: string, description: string, price: string) {
    await expect(this.page.getByText(itemId)).toBeVisible();
    await expect(this.page.getByText(description)).toBeVisible();
    // Use more specific locator for price to avoid multiple matches
    await expect(this.page.locator('table').getByText(price).first()).toBeVisible();
  }
}