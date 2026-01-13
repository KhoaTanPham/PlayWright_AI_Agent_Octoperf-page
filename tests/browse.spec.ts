import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { PetListPage } from '../page-object/petListPage';

test('Browse categories and view pet list', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  // Open a common category; adjust name if needed
  await home.gotoCatalog();
  await home.openCategory('Fish');
  const list = new PetListPage(page);
  // The app may redirect to Catalog.action — accept that as valid
  await expect(page).toHaveURL(/.*(Catalog.action|category|fish).*/i);
  // Expect at least one pet item visible
  const firstPet = await list.getFirstPetName();
  const visible = await list.isItemVisible(firstPet);
  expect(visible).toBeTruthy();
});
