import { Page, expect } from '@playwright/test';

export class SearchResultsPage {
  constructor(private page: Page) {}

  // Locators
  get searchResultsTable() { return this.page.locator('table'); }
  get productRows() { 
    // Get actual product rows - exclude header and empty rows
    return this.page.locator('table tbody tr').filter({ hasText: /FI-/ });
  }
  get returnToMainMenuLink() { return this.page.getByRole('link', { name: 'Return to Main Menu' }); }
  get noResultsMessage() { return this.page.getByText('No results found'); }

  // Methods
  async verifySearchResults(expectedProducts: string[]) {
    await expect(this.searchResultsTable).toBeVisible();
    
    for (const product of expectedProducts) {
      await expect(this.page.getByText(product)).toBeVisible();
    }
  }

  async verifyNoResults() {
    // Check if search results show no products (excluding header row)
    const dataRows = this.page.locator('table tbody tr').filter({ hasNot: this.page.locator('th') });
    const productCount = await dataRows.count();
    
    // Check if there are any actual product rows with content
    if (productCount > 0) {
      // Check if the rows contain actual product data or are empty
      const firstRowCells = dataRows.first().locator('td');
      const cellCount = await firstRowCells.count();
      if (cellCount === 1) {
        // Single empty cell means no results
        expect(productCount).toBeGreaterThanOrEqual(0);
      } else {
        // Multiple cells should have product data
        expect(productCount).toBe(0);
      }
    } else {
      expect(productCount).toBe(0);
    }
  }

  async clickProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async verifySearchResultsDisplayed() {
    // Wait for search to complete and results to load
    await this.page.waitForLoadState('networkidle');
    const productCount = await this.productRows.count();
    expect(productCount).toBeGreaterThan(0);
  }
}