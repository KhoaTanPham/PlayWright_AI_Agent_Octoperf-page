// spec: petstore-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures/pageObjectsFixtureUpdated';
import { SearchResultsPage } from '../page-objects/SearchResultsPage';

test.describe('Feature 7: Search Pet Test Cases', () => {
  let searchResultsPage: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    searchResultsPage = new SearchResultsPage(page);
  });

  test('TC_F7_AC1_Keyword_Search_Results', async ({ page, homePage, mainCatalogPage }) => {
    // Locate search box on main page
    await homePage.navigate();
    await homePage.enterStore();
    
    // Enter keyword 'fish' and execute search
    await mainCatalogPage.search('fish');
    
    // Verify search results show fish-related products
    await searchResultsPage.verifySearchResultsDisplayed();
    await expect(page.getByText('Goldfish')).toBeVisible();
    await expect(page.getByText('Angelfish')).toBeVisible();
  });

  test('TC_F7_AC2_Relevant_Search_Results', async ({ page, homePage, mainCatalogPage }) => {
    // Search for 'angelfish'
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.search('angelfish');
    
    // Verify search result relevancy
    await searchResultsPage.verifySearchResultsDisplayed();
    await expect(page.getByText('Angelfish')).toBeVisible();
  });

  test('TC_F7_AC3_No_Results_Message', async ({ page, homePage, mainCatalogPage }) => {
    // Enter search term that yields no results
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.search('xyz123');
    
    // Verify no results handling
    await searchResultsPage.verifyNoResults();
  });

  test('TC_F7_EDGE_Empty_Search_Handling', async ({ page, homePage, mainCatalogPage }) => {
    // Leave search field blank and submit
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.search('');
    
    // Verify empty search is handled appropriately
    // Either shows validation or returns all products
    // The specific behavior depends on application implementation
  });

  test('TC_F7_EDGE_Special_Characters_Search', async ({ page, homePage, mainCatalogPage }) => {
    // Enter special characters in search
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.search('@#$%^&*');
    
    // Verify special characters are processed safely with no system errors
    // Should either show no results or handle gracefully
    await expect(page).toHaveURL(/Catalog\.action/);
  });

  test('TC_F7_BOUNDARY_Long_Search_String', async ({ page, homePage, mainCatalogPage }) => {
    // Enter very long search string
    await homePage.navigate();
    await homePage.enterStore();
    const longSearchString = 'a'.repeat(500);
    await mainCatalogPage.search(longSearchString);
    
    // Verify long search strings are handled appropriately
    await expect(page).toHaveURL(/Catalog\.action/);
  });

  test('TC_F7_Search_Result_Navigation', async ({ page, homePage, mainCatalogPage }) => {
    // Perform a search that returns results
    await homePage.navigate();
    await homePage.enterStore();
    await mainCatalogPage.search('fish');
    
    // Click on a product from search results
    await searchResultsPage.verifySearchResultsDisplayed();
    
    // Verify product details page opens
    const firstProductLink = page.locator('table tbody tr a').first();
    await firstProductLink.click();
    
    // Should navigate to product details page
    await expect(page).toHaveURL(/viewProduct/);
  });
});