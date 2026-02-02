import {test, expect} from '@playwright/test'
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Page', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()
        await homePage.search('pipe cleaner')
        
    });
    test('should view an individual product', async ({ page }) => {
        const searchPage = new SearchPage(page)
        const productPage = new ProductPage(page)
        await searchPage.selectPurchaseableProduct()
        const title = await productPage.getProductTitle()
        expect(title).toContain('Pipe')
    });

    test('should add product to cart', async ({ page }) => {
        const productPage = new ProductPage(page)
        const searchPage = new SearchPage(page)
        await searchPage.selectPurchaseableProduct()
        await productPage.addToCart()
        await expect(page.getByRole('heading', {name:'added to cart'})).toBeVisible();
    });
});