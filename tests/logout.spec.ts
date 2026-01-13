import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { LoginPage } from '../page-object/loginPage';

test('Logout clears session and redirects to Home', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.goToLogin();
  const login = new LoginPage(page);
  await login.login('j2ee', 'j2ee');
  // Click logout - selector may need adjustment
  await page.getByRole('link', { name: /Logout|Sign out|Log out/i }).first().click();
  // The app redirects to the catalog page after logout on this site
  await expect(page).toHaveURL(/.*(Catalog.action|home|index).*/i);
  await expect(page.getByRole('link', { name: /Login|Sign in/i })).toBeVisible();
});
