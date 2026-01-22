import { test,expect } from "@playwright/test";

test.describe('User Purchase Journey',() => {

    test('user should search, filter, add a product to cart and set delivery address', async ({page}) => { 
        
        //Navigate to Amazon (authenticated)
        await page.goto('https://www.amazon.com.au')

        //Search for product
        await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
        await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('pipe cleaner');
        await page.getByRole('button', { name: 'Go', exact: true }).click();

        //Filter and select product
        await page.getByRole('link', { name: 'Craft', exact: true }).click()
        await page.getByRole('link', { name: 'Caydo 200 PCS Pipe Cleaners' }).click()
        
        //Add product to cart and checkout
        await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
        await page.getByRole('button', { name: 'Proceed to checkout (1 item)' }).click();

        //Set delivery details
        await page.getByRole('link', { name:'Add a new delivery address'}).click()
        await page.locator('span').filter({hasText:'Australia'}).click()
        await page.locator('#a-popover-8').getByRole('option', { name: 'New Zealand' }).click()
        await page.getByRole('textbox', { name: 'Full name (First and Last name)' }).fill('Greg Jeffries')
        await page.getByRole('textbox', { name: '9 309 6677' }).fill('2 135 9821')
        await page.getByRole('textbox', { name: 'Street address' }).fill('73 Fairytale Way')
        await page.getByRole('textbox', {name: 'Postcode'}).fill('9999')
        await page.getByRole('textbox', { name: 'Suburb' }).fill('Liarsville')
        await page.getByRole('textbox', { name: 'Town or City' }).fill('Smellington')
        await page.getByTestId('bottom-continue-button').click()
    })
} )
