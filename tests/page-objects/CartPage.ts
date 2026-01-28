import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Locators
  get cartTitle() { return this.page.getByRole('heading', { name: 'Shopping Cart' }); }
  get cartTable() { return this.page.locator('table'); }
  get cartRows() { return this.page.locator('table tbody tr').filter({ hasNot: this.page.locator('th') }); }
  get proceedToCheckoutButton() { return this.page.getByRole('link', { name: 'Proceed to Checkout' }); }
  get updateCartButton() { return this.page.getByRole('button', { name: 'Update Cart' }); }
  get removeLinks() { return this.page.getByRole('link', { name: 'Remove' }); }
  get quantityInputs() { return this.page.locator('input[type="text"]').filter({ hasText: /^\d+$/ }); }
  get subTotalCell() { return this.page.locator('td').filter({ hasText: /Sub Total:/ }); }

  // Methods
  async verifyCartPage() {
    await expect(this.cartTitle).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async verifyItemInCart(itemId: string, description: string, price: string, quantity: string = '1') {
    await expect(this.page.getByText(itemId)).toBeVisible();
    await expect(this.page.getByText(description)).toBeVisible();
    await expect(this.page.getByText(price)).toBeVisible();
    await expect(this.page.locator(`input[value="${quantity}"]`)).toBeVisible();
  }

  async verifySubTotal(expectedTotal: string) {
    await expect(this.subTotalCell).toContainText(expectedTotal);
  }

  async updateItemQuantity(itemIndex: number, newQuantity: string) {
    await this.quantityInputs.nth(itemIndex).fill(newQuantity);
    await this.updateCartButton.click();
  }

  async removeItem(itemIndex: number) {
    await this.removeLinks.nth(itemIndex).click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async verifyCartEmpty() {
    const rowCount = await this.cartRows.count();
    // Should only have the sub-total row, no product rows
    expect(rowCount).toBeLessThanOrEqual(1);
  }

  async getItemCount() {
    // Count rows that contain actual products (exclude sub-total row)
    const productRows = this.cartRows.filter({ hasNot: this.page.locator('text=/Sub Total/') });
    return await productRows.count();
  }
}