import { test,expect } from "@playwright/test";

test.describe('User Purchase Journey',() => {

    test.beforeEach(async ({ page }) => {
    await page.goto('https://www.amazon.com.au/cart?ref_=sw_gtc')
    if (await page.getByText('delete').isVisible()) {
        await page.getByText('delete').click()
    }
    else    
        return
});

    test('user should search, filter, add a product to cart and set delivery address', async ({page}) => { 
        
        //Navigate to Amazon (authenticated)
        await page.goto('https://www.amazon.com.au')

        //Search for product
        await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('button', { name: 'Go', exact: true }).click();

        //Filter and select product
        await page.getByRole('link', { name: 'Craft', exact: true }).click()
        await page.locator('.s-product-image-container').first().click()
        
        //Add product to cart and checkout
        await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
        await page.getByRole('button', { name: 'Proceed to checkout (1 item)' }).click();

        //Set delivery details
        await page.getByRole('link', { name:'Add a new delivery address'}).click()
        await page.locator('span').filter({hasText:'Australia'}).nth(4).click()
        await page.locator('#address-ui-widgets-countryCode-dropdown-nativeId_159').click();
        await page.getByRole('textbox', { name: 'Full name (First name and surname)' }).fill('Greg Jeffries')
        await page.getByRole('textbox', { name: '9 309 6677' }).fill('2 135 9821')
        await page.getByRole('textbox', { name: 'Street address' }).fill('73 Fairytale Way')
        await page.getByRole('textbox', {name: 'Postcode'}).fill('9999')
        await page.getByRole('textbox', { name: 'Suburb' }).fill('Liarsville')
        await page.getByRole('textbox', { name: 'Town or City' }).fill('Smellington')
        await page.getByTestId('bottom-continue-button').click()
    })
} )
