import {test as setup, expect} from '@playwright/test'
import path from 'path'
const authFile = path.join(__dirname, '../playwright/.auth/automationuser.json')

setup('Amazon User Authentication', async ({page}) => {
await page.goto('https://www.amazon.com.au')
if (await page.getByRole('button' ,  {name:'Continue shopping'}).isVisible() ) {
    await page.getByRole('button' ,  {name:'Continue shopping'}).click()
}
await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
await page.getByRole('textbox', { name: 'Enter mobile number or email' }).fill(process.env.USER_EMAIL!)
await page.getByRole('button', {name:'Continue'}).click()
await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!)
await page.getByRole('button', {name:'Sign-in'}).click()
await page.waitForURL('**=nav_ya_signin**')
await page.context().storageState({path: authFile})
})  
    