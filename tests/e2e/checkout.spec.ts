import { test, expect } from "@playwright/test";

test.describe('Checkout Flow', () => {
    test.beforeEach(async ({page}) => {
       await page.goto('https://www.amazon.com.au/cart?ref_=sw_gtc')

        if (await page.getByText('delete').isVisible()) {
        await page.getByText('delete').click()
    }
        // Navigate to the product page
        await page.goto('https://www.amazon.com.au')
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
        await page.locator('.a-link-normal').first().click()
        await page.locator('[id="submit.add-to-cart"]').click()
        
    })
    test('should proceed to checkout', async ({page}) => {
        await page.getByRole('button', { name: 'Proceed to checkout' }).click();
        await expect(page).toHaveURL(/.*checkout.*/);
    })
})