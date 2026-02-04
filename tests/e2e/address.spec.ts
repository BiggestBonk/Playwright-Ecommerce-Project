 import {test} from '@playwright/test'
 import { AddressPage } from '../../pages/AddressPage'

 test('User should fill in delivery details', async ({page}) => {
       const addressPage = new AddressPage(page)
       await addressPage.goto()
       await addressPage.OpenChangeAddress()
       await addressPage.ChangeCountry()
       await addressPage.FillDeliveryDetails()
       await addressPage.ConfirmAddress()
 })