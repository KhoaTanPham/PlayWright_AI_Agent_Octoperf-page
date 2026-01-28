import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { MainCatalogPage } from '../page-objects/MainCatalogPage';
import { CategoryPage } from '../page-objects/CategoryPage';
import { SearchResultsPage } from '../page-objects/SearchResultsPage';

type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  mainCatalogPage: MainCatalogPage;
  categoryPage: CategoryPage;
  searchResultsPage: SearchResultsPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  mainCatalogPage: async ({ page }, use) => {
    await use(new MainCatalogPage(page));
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

export { expect } from '@playwright/test';
export { expect } from '@playwright/test';