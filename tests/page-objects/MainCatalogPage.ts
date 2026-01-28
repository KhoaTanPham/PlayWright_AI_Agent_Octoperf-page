import { Page, expect } from '@playwright/test';

export class MainCatalogPage {
  constructor(private page: Page) {}

  // Locators  
  get signInLink() { return this.page.getByRole('link', { name: 'Sign In' }); }
  get signOutLink() { return this.page.getByRole('link', { name: 'Sign Out' }); }
  get myAccountLink() { return this.page.getByRole('link', { name: 'My Account' }); }
  get cartLink() { return this.page.locator('a[href*="Cart.action"]'); }
  get searchBox() { return this.page.locator('input[name="keyword"]'); }
  get searchButton() { return this.page.getByRole('button', { name: 'Search' }); }
  get welcomeMessage() { return this.page.locator('text=/Welcome/'); }
  
  // Category links
  get fishCategoryLink() { return this.page.locator('a[href*="categoryId=FISH"]').first(); }
  get dogsCategoryLink() { return this.page.locator('a[href*="categoryId=DOGS"]').first(); }
  get catsCategoryLink() { return this.page.locator('a[href*="categoryId=CATS"]').first(); }
  get reptilesCategoryLink() { return this.page.locator('a[href*="categoryId=REPTILES"]').first(); }
  get birdsCategoryLink() { return this.page.locator('a[href*="categoryId=BIRDS"]').first(); }

  // Methods
  async navigateToSignIn() {
    await this.signInLink.click();
  }

  async logout() {
    await this.signOutLink.click();
  }

  async search(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async navigateToCategory(category: 'fish' | 'dogs' | 'cats' | 'reptiles' | 'birds') {
    switch (category) {
      case 'fish':
        await this.fishCategoryLink.click();
        break;
      case 'dogs':
        await this.dogsCategoryLink.click();
        break;
      case 'cats':
        await this.catsCategoryLink.click();
        break;
      case 'reptiles':
        await this.reptilesCategoryLink.click();
        break;
      case 'birds':
        await this.birdsCategoryLink.click();
        break;
    }
  }

  async verifyLoggedInState() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.signOutLink).toBeVisible();
    await expect(this.myAccountLink).toBeVisible();
  }

  async verifyLoggedOutState() {
    await expect(this.signInLink).toBeVisible();
    await expect(this.signOutLink).not.toBeVisible();
    await expect(this.myAccountLink).not.toBeVisible();
  }

  async verifyCategoriesDisplayed() {
    await expect(this.fishCategoryLink).toBeVisible();
    await expect(this.dogsCategoryLink).toBeVisible();
    await expect(this.catsCategoryLink).toBeVisible();
    await expect(this.reptilesCategoryLink).toBeVisible();
    await expect(this.birdsCategoryLink).toBeVisible();
  }
}