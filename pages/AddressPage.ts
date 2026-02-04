import { BasePage } from "./BasePage"
import { expect } from "playwright/test"

export class AddressPage extends BasePage {
    private readonly ChangeDeliveryAddress = this.page.getByRole('link', { name:'Change delivery address'})
    private readonly EditDeliveryAddress = this.page.getByRole('link', { name: 'Edit address' })
    private readonly CountrySelectionDropdown = this.page.locator('span').filter({ hasText: /^New Zealand$/ }).nth(2)
    private readonly FullNameBox = this.page.getByRole('textbox', { name: 'Full name (First name and surname)' })
    private readonly PhoneNumberBox = this.page.getByRole('textbox', { name: '9 309 6677' })
    private readonly AddressBox = this.page.getByRole('textbox', { name: 'Street address' })
    private readonly PostcodeBox = this.page.getByRole('textbox', {name: 'Postcode'})
    private readonly SuburbBox = this.page.getByRole('textbox', { name: 'Suburb' })
    private readonly CityBox = this.page.getByRole('textbox', { name: 'Town or city' })
    private readonly ContinueButton = this.page.locator('#pagelet-layout-section').getByTestId('bottom-continue-button')

    async goto() {
      await this.page.goto('https://www.amazon.com.au/checkout/p/p-251-0031379-2705437/pay?pipelineType=Chewbacca&referrer=pay')  
    }

    async OpenChangeAddress() {
        await this.ChangeDeliveryAddress.click()
        await this.EditDeliveryAddress.click()
    }

    async ChangeCountry() {
        await this.CountrySelectionDropdown.click()
        await this.page.locator('#address-ui-widgets-countryCode-dropdown-nativeId_158').click();
        await this.page.locator('span').filter({ hasText: 'New Caledonia' }).nth(3).click()
        await this.page.locator('#a-popover-5').getByRole('option', { name: 'New Zealand' }).click()
    }

    async FillDeliveryDetails() {
        await this.FullNameBox.click()
        await this.FullNameBox.fill('Greg Jeffries')
        await this.PhoneNumberBox.click()
        await this.PhoneNumberBox.fill('2 135 9821')
        await this.AddressBox.click()
        await this.AddressBox.fill('73 Fairytale Way')
        await this.PostcodeBox.click()
        await this.PostcodeBox.fill('9999')
        await this.SuburbBox.click()
        await this.SuburbBox.fill('Liarsville')
        await this.CityBox.click()
        await this.CityBox.fill('Smellington')
    }

    async ConfirmAddress() {
        await this.ContinueButton.click()
    }
}