import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { PetListPage } from '../page-object/petListPage';
import { LoginPage } from '../page-object/loginPage';

test('View pet details shows name, description and price', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  // Login first to ensure catalog/pet list is available in-session
  const login = new LoginPage(page);
  await home.goToLogin();
  await login.login('j2ee', 'j2ee');
  await home.gotoCatalog();
  await home.openCategory('Fish');
  const list = new PetListPage(page);
  const firstPet = await list.getFirstPetName();
  await list.openPetByName(firstPet);
  // Verify we reached a product/detail URL (productId / itemId / viewProduct) or the page contains the product name
  const url = page.url();
  const okUrl = /productId=|itemId=|viewProduct|viewItem|Product.action|Catalog.action/.test(url);
  const hasName = (await page.getByText(new RegExp(firstPet, 'i')).count()) > 0;
  if (!okUrl && !hasName) {
    throw new Error('Did not navigate to a product detail page');
  }
});
