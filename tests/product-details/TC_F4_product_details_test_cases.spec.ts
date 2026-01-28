// spec: petstore-comprehensive-test-plan.md  
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixtureComplete';

test.describe('Feature 4: View Pet Details Test Cases', () => {
  test('TC_F4_AC1_Pet_Detail_Page_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Navigate to Fish category
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.verifyPageLoaded('Fish');

    // Select Angelfish from the pet list
    await categoryPage.clickProduct('FI-SW-01');
    
    // Verify pet detail page opens with selected pet information
    await productPage.verifyProductPage('Angelfish');
    await productPage.verifyItemsDisplayed();
  });

  test('TC_F4_AC2_Pet_Name_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Access Angelfish product details
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');

    // Verify pet name is prominently shown
    await productPage.verifyProductPage('Angelfish');
    await expect(page.getByRole('heading', { name: 'Angelfish' })).toBeVisible();
  });

  test('TC_F4_AC2_Description_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Navigate to any pet detail page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');

    // Verify description content is displayed
    await productPage.verifyProductPage('Angelfish');
    await expect(page.getByText('Large Angelfish')).toBeVisible();
    await expect(page.getByText('Small Angelfish')).toBeVisible();
  });

  test('TC_F4_AC2_Price_Display', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Access pet details with multiple variants (Angelfish)
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');

    // Verify price information display
    await productPage.verifyProductPage('Angelfish');
    await productPage.verifyItemDetails('EST-1', 'Large Angelfish', '$16.50');
    await productPage.verifyItemDetails('EST-2', 'Small Angelfish', '$16.50');
  });

  test('TC_F4_AC2_Add_Cart_Button_Present', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Navigate to pet details
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');

    // Verify Add to Cart button presence and accessibility
    await productPage.verifyProductPage('Angelfish');
    await productPage.verifyItemsDisplayed();
    
    // Verify buttons are clickable
    const addToCartCount = await productPage.addToCartButtons.count();
    expect(addToCartCount).toBeGreaterThan(0);
    
    for (let i = 0; i < addToCartCount; i++) {
      await expect(productPage.addToCartButtons.nth(i)).toBeVisible();
    }
  });

  test('TC_F4_Item_Details_Navigation', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Navigate to product page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.verifyProductPage('Angelfish');

    // Click on item details link
    await productPage.clickItemDetails('EST-1');
    
    // Verify item detail page displays detailed information
    await expect(page).toHaveURL(/viewItem.*itemId=EST-1/);
    await expect(page.getByText('EST-1')).toBeVisible();
  });

  test('TC_F4_Return_Navigation', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Navigate to product details
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.verifyProductPage('Angelfish');

    // Use return navigation
    await productPage.returnToCategoryLink.click();
    
    // Verify return to category page
    await categoryPage.verifyPageLoaded('Fish');
    await categoryPage.verifyFishProducts();
  });

  test('TC_F4_Multiple_Products_Details', async ({ page, homePage, mainCatalogPage, categoryPage, productPage }) => {
    // Test multiple product details in Fish category
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    
    // Test Angelfish details
    await categoryPage.clickProduct('FI-SW-01');
    await productPage.verifyProductPage('Angelfish');
    await productPage.returnToCategoryLink.click();
    
    // Test Tiger Shark details  
    await categoryPage.clickProduct('FI-SW-02');
    await productPage.verifyProductPage('Tiger Shark');
    await productPage.returnToCategoryLink.click();
    
    // Test Koi details
    await categoryPage.clickProduct('FI-FW-01');
    await productPage.verifyProductPage('Koi');
    await productPage.returnToCategoryLink.click();
    
    // Test Goldfish details
    await categoryPage.clickProduct('FI-FW-02');
    await productPage.verifyProductPage('Goldfish');
  });
});