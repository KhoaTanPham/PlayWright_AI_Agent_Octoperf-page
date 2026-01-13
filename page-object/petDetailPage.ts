import { Page } from '@playwright/test';

export class PetDetailPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async addToCart(quantity?: number) {
    if (quantity !== undefined) {
      const qtyLocator = this.page.locator('input[type="number"], input[name="quantity"], input#quantity');
      if (await qtyLocator.count() > 0) {
        await qtyLocator.fill(String(quantity));
      }
    }
    const button = this.page.getByRole('button', { name: /Add to Cart|Add to cart|Add/i }).first();
    if (await button.count() > 0) {
      await button.click();
      return;
    }
    const anchor = this.page.locator('a:has-text("Add to Cart"), a:has-text("Add")');
    if (await anchor.count() > 0) {
      const count = await anchor.count();
      for (let i = 0; i < count; i++) {
        const a = anchor.nth(i);
        const href = await a.getAttribute('href');
        const text = (await a.innerText()).trim();
        if (href && /add|workingItemId|itemId|productId|addItemToCart|addToCart/i.test(href)) {
          await a.click();
          return;
        }
        if (/^add to cart$/i.test(text) || /add to cart/i.test(text)) {
          await a.click();
          return;
        }
      }
    }
    const submit = this.page.locator('input[type="submit"][value*="Add"], input[type="button"][value*="Add"], input[type="image"][alt*="Add"]');
    if (await submit.count() > 0) {
      await submit.first().click();
      return;
    }
    // Some implementations use a form action to add items; try submitting the form
    const forms = this.page.locator('form[action*="addItem"], form[action*="addToCart"], form[action*="Cart.action"]');
    if (await forms.count() > 0) {
      await forms.first().evaluate((f: HTMLFormElement) => (f as HTMLFormElement).submit());
      return;
    }
    // Try links that add items directly
    const addLinks = this.page.locator('a[href*="addItem"], a[href*="addToCart"], a[href*="addItemToCart"], a[href*="workingItemId"], a[href*="productId"], a[href*="itemId"]');
    if (await addLinks.count() > 0) {
      await addLinks.first().click();
      return;
    }
    // Last-resort: click any visible element that contains Add to Cart-like text
    const anyAdd = this.page.locator('text=/Add to Cart|Add to cart|Add/i').first();
    if (await anyAdd.count() > 0) {
      try {
        await anyAdd.click({ trial: false });
        return;
      } catch (e) {
        // ignore and continue to throw below
      }
    }

    // Fallback: try to extract an item id or workingItemId and call Cart.action add URL directly
    try {
      const currentUrl = this.page.url();
      const parsed = new URL(currentUrl);
      const possibleKeys = ['workingItemId', 'itemId', 'productId', 'id'];
      let itemId: string | null = null;
      for (const k of possibleKeys) {
        const v = parsed.searchParams.get(k);
        if (v) { itemId = v; break; }
      }
      if (!itemId) {
        const input = this.page.locator('input[name="workingItemId"], input[name="itemId"], input[name="productId"], input[name="id"]').first();
        if (await input.count() > 0) {
          itemId = await input.inputValue();
        }
      }
      if (!itemId) {
        // try to find a link with productId or workingItemId in href
        const link = this.page.locator('a[href*="workingItemId"], a[href*="productId"], a[href*="itemId"], a[href*="addItemToCart"], a[href*="addItem"]').first();
        if (await link.count() > 0) {
          const href = await link.getAttribute('href');
          if (href) {
            const u = new URL(href, 'https://petstore.octoperf.com/');
            for (const k of possibleKeys) {
              const v = u.searchParams.get(k);
              if (v) { itemId = v; break; }
            }
          }
        }
      }
      if (itemId) {
        const addUrl = `https://petstore.octoperf.com/actions/Cart.action?addItemToCart=&workingItemId=${encodeURIComponent(itemId)}`;
        await this.page.goto(addUrl);
        return;
      }
    } catch (e) {
      // ignore and allow throw below
    }
    throw new Error('Add to Cart control not found');
  }
}
