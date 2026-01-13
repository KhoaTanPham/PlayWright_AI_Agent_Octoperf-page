import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async proceed() {
    const btn = this.page.getByRole('button', { name: /Proceed to Checkout|Checkout|Proceed|Continue|Complete Order/i }).first();
    if (await btn.count() > 0) {
      await btn.click();
      return;
    }
    // Common anchors/links
    const anchor = this.page.locator('a[href*="checkout"], a[href*="Order"], a:has-text("Proceed to Checkout"), a:has-text("Checkout"), a:has-text("Proceed"), a:has-text("Continue")');
    if (await anchor.count() > 0) {
      await anchor.first().click();
      return;
    }
    // Submit inputs/buttons
    const submit = this.page.locator('input[type="submit"][value*="Proceed"], input[type="submit"][value*="Checkout"], input[type="button"][value*="Proceed"], input[type="image"][alt*="Proceed"], input[type="image"][alt*="Checkout"]');
    if (await submit.count() > 0) {
      await submit.first().click();
      return;
    }
    // Try form submission for forms that look like checkout/order forms
    const forms = this.page.locator('form[action*="checkout"], form[action*="Order"], form[action*="newOrderForm"], form[action*="confirm"]');
    if (await forms.count() > 0) {
      await forms.first().evaluate((f: HTMLFormElement) => (f as HTMLFormElement).submit());
      return;
    }
    // Last-resort: find visible text that looks like proceed/checkout and click
    const anyProceed = this.page.locator('text=/Proceed to Checkout|Checkout|Proceed|Continue to Checkout/i').first();
    if (await anyProceed.count() > 0) {
      try { await anyProceed.click(); return; } catch (e) { /* continue */ }
    }
    throw new Error('Proceed to Checkout control not found');
  }
  async confirmOrder() {
    // Some pages present a 'Continue' (newOrder) step before the final confirm
    const continueBtn = this.page.getByRole('button', { name: /Continue|Continue to Checkout|Continue Order/i }).first();
    if (await continueBtn.count() > 0) {
      await continueBtn.click();
      // wait for navigation or DOM change
      await this.page.waitForLoadState('networkidle').catch(() => {});
    }
    const continueSubmit = this.page.locator('input[name="newOrder"][value*="Continue"], input[type="submit"][value*="Continue"]');
    if (await continueSubmit.count() > 0) {
      await continueSubmit.first().click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
    }

    // Now try final confirm/place order
    const btn = this.page.getByRole('button', { name: /Confirm|Place Order|Place order|Complete Order|Confirm Order/i }).first();
    if (await btn.count() > 0) { await btn.click(); return; }
    const anchor = this.page.locator('a:has-text("Confirm"), a:has-text("Place Order"), a:has-text("Complete Order")');
    if (await anchor.count() > 0) { await anchor.first().click(); return; }
    const submit = this.page.locator('input[type="submit"][value*="Place"], input[type="submit"][value*="Confirm"], input[type="submit"][value*="Complete"]');
    if (await submit.count() > 0) { await submit.first().click(); return; }
    const forms = this.page.locator('form[action*="confirm"], form[action*="Order"], form[action*="placeOrder"]');
    if (await forms.count() > 0) { await forms.first().evaluate((f: HTMLFormElement) => (f as HTMLFormElement).submit()); return; }
    throw new Error('Confirm order control not found');
  }
}
