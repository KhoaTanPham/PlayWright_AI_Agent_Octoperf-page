// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixture';
import { CategoryPage } from '../page-objects/CategoryPage';

test.describe('Feature 3: Browse Pet Categories Test Cases', () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
  });

  test('TC_F3_AC1_Category_List_Display', async ({ page, homePage, mainCatalogPage }) => {
    // Navigate to main catalog page and verify category display
    await homePage.navigate();
    await homePage.enterStore();
    
    // Verify all pet categories are displayed
    await mainCatalogPage.verifyCategoriesDisplayed();
    
    // Verify each category shows appropriate description
    await expect(page.getByText('Saltwater, Freshwater')).toBeVisible();
    await expect(page.getByText('Various Breeds')).toBeVisible();
    await expect(page.getByText('Various Breeds, Exotic Varieties')).toBeVisible();
    await expect(page.getByText('Lizards, Turtles, Snakes')).toBeVisible();
    await expect(page.getByText('Exotic Varieties')).toBeVisible();
  });

  test('TC_F3_AC2_Category_Click_Navigation', async ({ page, homePage, mainCatalogPage }) => {
    // Locate Fish category on main page
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.verifyCategoriesDisplayed();

    // Click on Fish category
    await mainCatalogPage.navigateToCategory('fish');
    
    // Verify pet list page is displayed for Fish
    await categoryPage.verifyPageLoaded('Fish');
    await categoryPage.verifyFishProducts();
  });

  test('TC_F3_AC3_Pet_Item_Details_Display', async ({ page, homePage, mainCatalogPage }) => {
    // Navigate to Fish category
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('fish');
    
    // Verify pet item display includes name, description, and product ID
    await categoryPage.verifyPageLoaded('Fish');
    
    // Check that each fish product shows clearly
    await expect(page.getByText('Angelfish')).toBeVisible();
    await expect(page.getByText('Tiger Shark')).toBeVisible(); 
    await expect(page.getByText('Koi')).toBeVisible();
    await expect(page.getByText('Goldfish')).toBeVisible();
  });

  test('TC_F3_EDGE_All_Categories_Functional', async ({ page, homePage, mainCatalogPage }) => {
    // Test navigation to each category
    await homePage.navigate();
    await homePage.enterStore();
    
    const categories = ['fish', 'dogs', 'cats', 'reptiles', 'birds'] as const;
    const categoryNames = ['Fish', 'Dogs', 'Cats', 'Reptiles', 'Birds'];
    
    for (let i = 0; i < categories.length; i++) {
      // Navigate to category
      await mainCatalogPage.navigateToCategory(categories[i]);
      
      // Verify each category loads successfully
      await categoryPage.verifyPageLoaded(categoryNames[i]);
      await categoryPage.verifyProductsDisplayed();
      
      // Return to main menu for next category
      await categoryPage.returnToMainMenu();
    }
  });

  test('TC_F3_EDGE_Empty_Category_Handling', async ({ page, homePage, mainCatalogPage }) => {
    // Navigate to a category and verify it handles content appropriately
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.navigateToCategory('birds');
    
    // Verify category page loads and navigation remains functional
    await categoryPage.verifyPageLoaded('Birds');
    
    // Verify return navigation works
    await expect(categoryPage.returnToMainMenuLink).toBeVisible();
  });
});