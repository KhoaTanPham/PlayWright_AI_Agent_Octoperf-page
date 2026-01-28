// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixture';

test.describe('Feature 1: User Login Test Cases', () => {
  test('TC_F1_AC1_Valid_Login_Success', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to PetStore application homepage
    await homePage.navigate();
    await homePage.verifyPageLoaded();

    // Enter the store to access main application  
    await homePage.enterStore();

    // Access login page to perform authentication
    await mainCatalogPage.navigateToSignIn();
    await loginPage.verifyLoginPageDisplayed();

    // Setup dialog handler before login
    loginPage.handleLoginAlert();

    // Enter valid credentials and submit login
    await loginPage.loginWith('j2ee', 'j2ee');

    // Verify successful login state
    await mainCatalogPage.verifyLoggedInState();
  });

  test('TC_F1_AC1_Valid_Login_Demo_Account', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to login page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();
    await loginPage.verifyLoginPageDisplayed();

    // Setup dialog handler and login with demo account
    loginPage.handleLoginAlert();
    await loginPage.loginWith('demo', 'demo');

    // Verify successful login
    await mainCatalogPage.verifyLoggedInState();
  });

  test('TC_F1_AC2_Invalid_Password_Error', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to login page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();
    await loginPage.verifyLoginPageDisplayed();

    // Attempt login with invalid password
    await loginPage.loginWith('j2ee', 'wrongpass');

    // Verify login fails - user should remain on login page
    await loginPage.verifyLoginPageDisplayed();
    
    // Verify user is not logged in
    await expect(page.url()).toContain('Account.action');
  });

  test('TC_F1_AC3_Invalid_Username_Error', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to login page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();

    // Attempt login with invalid username
    await loginPage.loginWith('invaliduser', 'anypassword');

    // Verify login fails
    await loginPage.verifyLoginPageDisplayed();
    await expect(page.url()).toContain('Account.action');
  });

  test('TC_F1_AC4_Empty_Username_Validation', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to login page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();

    // Attempt login with empty username
    await loginPage.fillCredentials('', 'j2ee');
    await loginPage.submitLogin();

    // Verify validation prevents form submission or shows error
    await loginPage.verifyLoginPageDisplayed();
  });

  test('TC_F1_AC5_Empty_Password_Validation', async ({ page, homePage, loginPage, mainCatalogPage }) => {
    // Navigate to login page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToSignIn();

    // Attempt login with empty password
    await loginPage.fillCredentials('j2ee', '');
    await loginPage.submitLogin();

    // Verify validation prevents form submission or shows error
    await loginPage.verifyLoginPageDisplayed();
  });
});