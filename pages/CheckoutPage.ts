import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    private readonly ProceedToCheckoutButton = this.page.getByRole('button', {name: 'Proceed to checkout'})

    constructor(page:Page) {
        super(page)
    }

    async proceedToCheckout() {
        await this.ProceedToCheckoutButton.click()
    }
}