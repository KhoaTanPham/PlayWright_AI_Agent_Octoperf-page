import { Page, expect } from '@playwright/test';

export class CategoryPage {
  constructor(private page: Page) {}

  // Locators
  get categoryTitle() { return this.page.locator('h2'); }
  get returnToMainMenuLink() { return this.page.getByRole('link', { name: 'Return to Main Menu' }); }
  get returnToCategoryLink() { return this.page.locator('a[href*="viewCategory"]').first(); }
  get productTable() { return this.page.locator('table'); }
  get productRows() { return this.page.locator('table tbody tr').filter({ hasNot: this.page.locator('th') }); }
  
  // Fish category specific
  get fishProducts() {
    return {
      angelfish: this.page.getByRole('link', { name: 'FI-SW-01' }),
      tigerShark: this.page.getByRole('link', { name: 'FI-SW-02' }),
      koi: this.page.getByRole('link', { name: 'FI-FW-01' }),
      goldfish: this.page.getByRole('link', { name: 'FI-FW-02' })
    };
  }

  // Methods
  async verifyPageLoaded(categoryName: string) {
    // Wait for navigation to complete before checking category title
    await this.page.waitForURL('**/*viewCategory*');
    await expect(this.categoryTitle).toContainText(categoryName, { timeout: 10000 });
    await expect(this.productTable).toBeVisible();
  }

  async verifyFishProducts() {
    await expect(this.fishProducts.angelfish).toBeVisible();
    await expect(this.fishProducts.tigerShark).toBeVisible(); 
    await expect(this.fishProducts.koi).toBeVisible();
    await expect(this.fishProducts.goldfish).toBeVisible();
  }

  async clickProduct(productId: string) {
    await this.page.getByRole('link', { name: productId }).click();
  }

  async returnToMainMenu() {
    await this.returnToMainMenuLink.click();
  }

  async verifyProductsDisplayed() {
    await expect(this.productTable).toBeVisible();
    const productCount = await this.productRows.count();
    expect(productCount).toBeGreaterThan(0);
  }
}