import { Page } from '@playwright/test';

export class PetListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async openPetByName(name: string) {
    const roleLink = this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    if (await roleLink.count() > 0) {
      await roleLink.click();
      return;
    }
    const textLocator = this.page.getByText(new RegExp(name, 'i')).first();
    if (await textLocator.count() > 0) {
      await textLocator.click();
      return;
    }
    const hrefLocator = this.page.locator(`a[href*="${name.toLowerCase().replace(/\s+/g, '')}"]`);
    if (await hrefLocator.count() > 0) {
      await hrefLocator.first().click();
      return;
    }
    throw new Error(`Pet link for \"${name}\" not found`);
  }
  async isItemVisible(name: string) {
    if (!name || !name.trim()) return false;
    // Use a first-match locator for the exact name (case-insensitive)
    const locator = this.page.locator(`text=${name}`).first();
    return locator.count().then(c => c > 0 ? locator.isVisible() : false);
  }

  async getFirstPetName(): Promise<string> {
    // Try common structures: links inside product listing
    // Prefer anchors that look like product links (href contains viewProduct/productId/viewItem/product)
    const productAnchors = this.page.locator('table a[href*="viewProduct"], table a[href*="productId"], table a[href*="viewItem"], table a[href*="product"], table a[href*="item"], a[href*="viewProduct"], a[href*="productId"], a[href*="viewItem"], a[href*="product"], a[href*="item"]');
    if (await productAnchors.count() > 0) {
      const count = await productAnchors.count();
      for (let i = 0; i < count; i++) {
        const a = productAnchors.nth(i);
        const text = (await a.innerText()).trim();
        if (text && text.length >= 3 && !/^(Sign In|Sign Out|Help|Home|Cart|Contact|About)$/i.test(text)) return text;
      }
    }
    // Try several candidate anchors and return the first with non-empty text
    const anchors = this.page.locator('a');
    const count = await anchors.count();
    for (let i = 0; i < count; i++) {
      const a = anchors.nth(i);
      const text = (await a.innerText()).trim();
      if (text && text.length >= 3 && text.length <= 60) {
        // ignore common header/footer links
        if (/^(Sign In|Sign Out|Help|Home|Cart|Contact|About)$/i.test(text)) continue;
        return text;
      }
    }
    // Try headings
    const headings = this.page.locator('h1, h2, h3, .product-name, .title');
    const hcount = await headings.count();
    for (let i = 0; i < hcount; i++) {
      const h = headings.nth(i);
      const t = (await h.innerText()).trim();
      if (t && t.length >= 3) return t;
    }
    throw new Error('No pet names found on the pet list page');
  }
}
