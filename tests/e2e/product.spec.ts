import {test, expect} from '@playwright/test'

test.describe('Product Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com.au');
        // Navigate to the product page
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
    });

    test('should view product details', async ({ page }) => {
        // open the product page of the first item listed (to reduce flakiness)
        await page.locator('.a-link-normal').first().click()
        await expect(page.locator('#productTitle')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    });

    test('should add product to cart', async ({ page }) => {
        await page.locator('.a-link-normal').first().click()
        await page.locator('[id="submit.add-to-cart"]').click()
        
        await expect(page.getByRole('heading',{name: 'Added to Cart'})).toBeVisible();
    });
});