import {test, expect} from "playwright/test";

test.describe('Product search', () => {
        test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com.au');
        })

    test('should search for products to buy',async ({page}) => {
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
        await expect(page).toHaveURL(/.*s\?k=pipe.*/);
    })
    test('should filter search results by type', async ({page}) => {
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');  
        await page.getByRole('link', { name: 'Craft', exact: true }).click()
        await expect (page).toHaveURL(/.*craft.*/) 
    })

})