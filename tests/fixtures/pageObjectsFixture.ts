import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { MainCatalogPage } from '../page-objects/MainCatalogPage';

type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  mainCatalogPage: MainCatalogPage;
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
});

export { expect } from '@playwright/test';