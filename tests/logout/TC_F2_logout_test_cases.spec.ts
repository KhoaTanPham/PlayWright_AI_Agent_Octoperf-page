// spec: petstore-comprehensive-test-plan.md  
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixture';

test.describe('Feature 2: User Logout Test Cases', () => {
  test('TC_F2_AC1_Successful_Logout', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Login with valid credentials
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();
    
    loginPage.handleLoginAlert();
    await loginPage.loginWith('j2ee', 'j2ee');
    await mainCatalogPage.verifyLoggedInState();

    // Perform logout
    await mainCatalogPage.logout();

    // Verify successful logout
    await mainCatalogPage.verifyLoggedOutState();
    
    // Verify redirected to main page
    await expect(page.url()).toContain('Catalog.action');
  });

  test('TC_F2_AC2_Logout_Redirect_Homepage', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Complete login process
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();
    
    loginPage.handleLoginAlert();
    await loginPage.loginWith('j2ee', 'j2ee');
    await mainCatalogPage.verifyLoggedInState();

    // Execute logout and verify redirection
    await mainCatalogPage.logout();
    
    // Verify user is redirected to main page and no logged-in indicators remain
    await mainCatalogPage.verifyLoggedOutState();
    await expect(page.url()).toContain('Catalog.action');
  });

  test('TC_F2_AC3_Logout_Option_Visibility', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Login and verify authenticated state
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();
    
    loginPage.handleLoginAlert();
    await loginPage.loginWith('j2ee', 'j2ee');
    await mainCatalogPage.verifyLoggedInState();

    // Complete logout and verify UI state changes
    await mainCatalogPage.logout();
    await mainCatalogPage.verifyLoggedOutState();
  });
});