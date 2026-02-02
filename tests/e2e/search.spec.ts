import {test, expect} from "playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SearchPage } from "../../pages/SearchPage";

test.describe('Product search', () => {
        test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com.au');
        })

    test('should search for products to buy',async ({page}) => {
    const homePage = new HomePage(page)
    await homePage.search('pipe cleaner')
    })
    test('should filter search results by type', async ({page}) => {
        const homePage = new HomePage(page)
        const searchPage = new SearchPage(page)
        await homePage.search('pipe cleaner')
        await searchPage.applyFilter('Craft')
        await searchPage.verifyAppliedFilter('craft')
    })

})