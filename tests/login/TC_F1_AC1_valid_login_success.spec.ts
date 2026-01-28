// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Feature 1: User Login Test Cases', () => {
  test('TC_F1_AC1_Valid_Login_Success', async ({ page }) => {
    // Navigate to PetStore application homepage
    await page.goto('https://petstore.octoperf.com/');

    // Enter the store to access main application
    await page.getByRole('link', { name: 'Enter the Store' }).click();

    // Access login page to perform authentication
    await page.getByRole('link', { name: 'Sign In' }).click();

    // Enter valid username for authentication
    await page.locator('input[name="username"]').fill('j2ee');

    // Enter valid password for authentication
    await page.locator('input[name="password"]').fill('j2ee');

    // Submit login form to authenticate user
    await page.getByRole('button', { name: 'Login' }).click();

    // Handle alert dialog that appears after login
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Verify Sign Out link is visible after successful login
    await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();

    // Verify My Account link is visible after successful login
    await expect(page.getByRole('link', { name: 'My Account' })).toBeVisible();

    // Verify welcome message displays logged-in state
    await expect(page.getByText('Welcome !')).toBeVisible();
  });
});