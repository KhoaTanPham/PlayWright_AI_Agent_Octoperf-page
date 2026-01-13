import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { LoginPage } from '../page-object/loginPage';

test.describe('Login feature', () => {
  test('Login with valid credentials', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.goToLogin();
    const login = new LoginPage(page);
    await login.login('j2ee', 'j2ee');
    // The app redirects to the catalog/home page after sign-in — accept Catalog.action as valid
    await expect(page).toHaveURL(/.*(Catalog.action|home|account|myaccount|profile).*/i);
    await expect(page.getByText(/j2ee|Welcome|Hello/i)).toBeVisible();
  });

  test('Login with invalid password shows error', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.goToLogin();
    const login = new LoginPage(page);
    await login.login('j2ee', 'wrongpass');
    await expect(page.getByText(/invalid|error|credentials/i)).toBeVisible();
  });
});
