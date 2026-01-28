import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Locators - Payment Details
  get cardTypeDropdown() { return this.page.locator('select').first(); }
  get cardNumberInput() { return this.page.locator('input[name="order.creditCard"]'); }
  get expiryDateInput() { return this.page.locator('input[name="order.expiryDate"]'); }
  
  // Billing Address
  get firstNameInput() { return this.page.locator('input[name="order.billToFirstName"]'); }
  get lastNameInput() { return this.page.locator('input[name="order.billToLastName"]'); }
  get address1Input() { return this.page.locator('input[name="order.billAddress1"]'); }
  get address2Input() { return this.page.locator('input[name="order.billAddress2"]'); }
  get cityInput() { return this.page.locator('input[name="order.billCity"]'); }
  get stateInput() { return this.page.locator('input[name="order.billState"]'); }
  get zipInput() { return this.page.locator('input[name="order.billZip"]'); }
  get countryInput() { return this.page.locator('input[name="order.billCountry"]'); }
  
  // Actions
  get continueButton() { return this.page.getByRole('button', { name: 'Continue' }); }
  get shipToDifferentAddressCheckbox() { return this.page.locator('input[type="checkbox"]'); }
  
  // Order confirmation elements
  get orderSummaryTable() { return this.page.locator('table').first(); }
  get confirmOrderButton() { return this.page.getByRole('button', { name: 'Confirm' }); }

  // Methods
  async verifyCheckoutPage() {
    await expect(this.cardTypeDropdown).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async verifyPaymentForm() {
    await expect(this.cardTypeDropdown).toBeVisible();
    await expect(this.cardNumberInput).toBeVisible();
    await expect(this.expiryDateInput).toBeVisible();
  }

  async verifyBillingAddressForm() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.address1Input).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.zipInput).toBeVisible();
  }

  async selectCardType(cardType: string) {
    await this.cardTypeDropdown.selectOption(cardType);
  }

  async toggleShipToDifferentAddress() {
    await this.shipToDifferentAddressCheckbox.check();
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async verifyOrderSummary() {
    await expect(this.orderSummaryTable).toBeVisible();
  }

  async confirmOrder() {
    if (await this.confirmOrderButton.isVisible()) {
      await this.confirmOrderButton.click();
    }
  }

  async verifyCheckoutFormFields() {
    // Verify all required form fields are present
    await this.verifyPaymentForm();
    await this.verifyBillingAddressForm();
  }
}