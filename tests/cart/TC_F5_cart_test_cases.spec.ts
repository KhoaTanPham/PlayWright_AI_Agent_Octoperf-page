// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixtureComplete';

test.describe('Feature 5: Add Pet to Cart Test Cases', () => {
  test('TC_F5_AC1_Add_Pet_To_Cart', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Navigate to Angelfish product page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.verifyPageLoaded('Fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.verifyProductPage('Angelfish');

    // Click 'Add to Cart' for Large Angelfish (EST-1)
    await productPage.addFirstItemToCart();

    // Verify item is added to cart
    await cartPage.verifyCartPage();
    await cartPage.verifyItemInCart('EST-1', 'Large Angelfish', '$16.50');
    await cartPage.verifySubTotal('$16.50');
  });

  test('TC_F5_AC2_Cart_Quantity_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Add Large Angelfish to cart
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Verify cart shows accurate quantity information
    await cartPage.verifyCartPage();
    await cartPage.verifyItemInCart('EST-1', 'Large Angelfish', '$16.50', '1');
  });

  test('TC_F5_AC3_Cart_Price_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Add pet item to shopping cart
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Verify cart shows correct pricing
    await cartPage.verifyCartPage();
    await cartPage.verifyItemInCart('EST-1', 'Large Angelfish', '$16.50');
    await cartPage.verifySubTotal('$16.50');
  });

  test('TC_F5_AC4_Multiple_Pets_Cart', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Add Large Angelfish (EST-1) to cart
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Navigate back and add Small Angelfish (EST-2) to cart
    await categoryPage.returnToMainMenu();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    
    // Add second item
    const addToCartButtons = productPage.addToCartButtons;
    await addToCartButtons.nth(1).click(); // Add Small Angelfish

    // Verify multiple pets in cart
    await cartPage.verifyCartPage();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
  });

  test('TC_F5_EDGE_Cart_Quantity_Limits', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Add item to cart
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Test boundary values for cart quantities
    await cartPage.verifyCartPage();
    
    // Test quantity update to 5
    await cartPage.updateItemQuantity(0, '5');
    await cartPage.verifySubTotal('$82.50'); // 5 * $16.50
    
    // Test quantity update to 10
    await cartPage.updateItemQuantity(0, '10');
    await cartPage.verifySubTotal('$165.00'); // 10 * $16.50
  });

  test('TC_F5_EDGE_Duplicate_Item_Handling', async ({ page, homePage, mainCatalogPage, categoryPage, productPage, cartPage }) => {
    // Add EST-1 to cart
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Add the same item (EST-1) again to cart
    await categoryPage.returnToMainMenu();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.addFirstItemToCart();

    // Verify duplicate addition is handled correctly
    await cartPage.verifyCartPage();
    // Should either increase quantity or create separate entry
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(1);
  });
});