import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SearchPage } from "../../pages/SearchPage";
import { ProductPage } from "../../pages/ProductPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test.describe('Checkout Flow', () => {
    test.beforeEach(async ({page}) => {
       await page.goto('https://www.amazon.com.au/cart?ref_=sw_gtc')

        if (await page.getByText('delete').isVisible()) {
        await page.getByText('delete').click()
    }
        // Navigate to the product page
        const homePage = new HomePage(page)
        const searchPage = new SearchPage(page)
        const productPage = new ProductPage(page)
        await homePage.goto()
        await homePage.search('pipecleaner')
        await searchPage.selectPurchaseableProduct()
        await productPage.addToCart()
        
    })
    test('should proceed to checkout', async ({page}) => {
        const checkoutPage = new CheckoutPage(page)
        await checkoutPage.proceedToCheckout()
        await expect(page).toHaveURL(/.*checkout.*/)
    })
})