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
  get quantityInputs() { return this.page.locator('table tbody tr').locator('input[type="text"]'); }
  get subTotalCell() { return this.page.locator('td').filter({ hasText: /Sub Total:/ }); }

  // Methods
  async verifyCartPage() {
    await expect(this.cartTitle).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async verifyItemInCart(itemId: string, description: string, price: string, quantity: string = '1') {
    // Find the row containing the item ID
    const itemRow = this.page.locator('table tbody tr').filter({ hasText: itemId }).first();
    
    await expect(itemRow.getByText(itemId)).toBeVisible();
    await expect(itemRow.getByText(description)).toBeVisible();
    
    // Check price in the specific row - use the List Price column (6th column)
    await expect(itemRow.locator('td').nth(5)).toContainText(price);
    
    await expect(itemRow.locator(`input[value="${quantity}"]`)).toBeVisible();
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
    // Check for the "Your cart is empty." message or verify no product rows
    const emptyMessage = this.page.getByText('Your cart is empty.');
    await expect(emptyMessage).toBeVisible();
  }

  async getItemCount() {
    // Count rows that contain actual products (exclude sub-total row)
    const productRows = this.cartRows.filter({ hasNot: this.page.locator('text=/Sub Total/') });
    return await productRows.count();
  }
}