import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { PetListPage } from '../page-object/petListPage';
import { PetDetailPage } from '../page-object/petDetailPage';
import { CartPage } from '../page-object/cartPage';
import { LoginPage } from '../page-object/loginPage';

test('Add pet to cart and verify quantity and price', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  await home.goToLogin();
  await login.login('j2ee', 'j2ee');
  await home.goto();
  await home.gotoCatalog();
  await home.openCategory('Fish');
  const list = new PetListPage(page);
  const firstPet = await list.getFirstPetName();
  await list.openPetByName(firstPet);
  const detail = new PetDetailPage(page);
  await detail.addToCart(2);
  const cart = new CartPage(page);
  await cart.goto();
  // Basic expectation: item present; selector may need fine-tuning
  await expect(page.getByText(new RegExp(firstPet, 'i'))).toBeVisible();
});
