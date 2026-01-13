import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';

test('Search returns relevant results and no-results case', async ({ page }) => {
  const home = new HomePage(page);
  await home.gotoCatalog();
  // Try a positive search — try several possible selectors
  const selectors = ['input[name="keyword"]', 'input[name="keywords"]', 'input[name="search"]', 'input[type="search"]', 'input#search', 'input#keyword'];
  let found = false;
  for (const sel of selectors) {
    const locator = page.locator(sel);
    if (await locator.count() > 0) {
      await locator.fill('goldfish');
      found = true;
      break;
    }
  }
  if (!found) {
    // Fallback: pick first visible non-password input
    // Try common placeholder/aria patterns
    const moreSelectors = ['input[placeholder*="Search"]', 'input[placeholder*="search"]', 'input[aria-label*="search"]', 'input[aria-label*="Search"]', 'input[role="searchbox"]'];
    for (const sel of moreSelectors) {
      const loc = page.locator(sel);
      if (await loc.count() > 0) {
        await loc.first().fill('goldfish');
        found = true;
        break;
      }
    }
    if (!found) {
      const fallback = page.locator('input:not([type="hidden"]):not([type="password"])').first();
      if (await fallback.count() > 0) {
        await fallback.fill('goldfish');
        found = true;
      }
    }
  }
  if (!found) throw new Error('Search input not found using common selectors');
  const btn = page.getByRole('button', { name: /Search|Go/i }).first();
  if (await btn.count() > 0) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
      btn.click(),
    ]);
  } else {
    await page.keyboard.press('Enter');
  }
  // Either results show the term, or there are product items
  const hasTerm = (await page.getByText(/goldfish|Goldfish/i).count()) > 0;
  const productCount = await page.locator('.product, .item, .Product, .productListing, .entry').count();
  if (!hasTerm && productCount === 0) throw new Error('Search did not return results');

  // Try no-results
  found = false;
  for (const sel of selectors) {
    const locator = page.locator(sel);
    if (await locator.count() > 0) {
      await locator.fill('nonexistentpet');
      found = true;
      break;
    }
  }
  if (!found) throw new Error('Search input not found for no-results case');
  if (await btn.count() > 0) {
    await btn.click();
  } else {
    await page.keyboard.press('Enter');
  }
  const noResults = (await page.getByText(/No results found|no results|not found/i).count()) > 0;
  const productsAfter = await page.locator('.product, .item, .Product, .productListing, .entry').count();
  if (!noResults && productsAfter > 0) throw new Error('Expected no results but found products');
});
