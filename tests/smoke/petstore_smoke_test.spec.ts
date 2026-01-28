// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('PetStore Demo - Quick Smoke Test', () => {
  test('Basic Navigation and Login Flow', async ({ page }) => {
    // Navigate to PetStore application homepage
    await page.goto('https://petstore.octoperf.com/');
    
    // Verify homepage loads
    await expect(page.getByRole('heading', { name: 'Welcome to JPetStore 6' })).toBeVisible();
    
    // Enter the store
    await page.getByRole('link', { name: 'Enter the Store' }).click();
    
    // Verify main catalog page
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    
    // Navigate to login
    await page.getByRole('link', { name: 'Sign In' }).click();
    
    // Verify login form
    await expect(page.getByText('Please enter your username and password.')).toBeVisible();
    
    // Login with valid credentials
    await page.locator('input[name="username"]').fill('j2ee');
    await page.locator('input[name="password"]').fill('j2ee');
    
    // Handle potential alert dialog
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login
    await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Account' })).toBeVisible();
    await expect(page.getByText('Welcome !')).toBeVisible();
  });
});