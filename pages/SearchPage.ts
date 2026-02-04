import { BasePage } from "./BasePage"
import { expect } from "playwright/test"
export class SearchPage extends BasePage {
    private readonly resultItems = this.page.locator('.s-result-item')

    async applyFilter(type: string) {
       await this.page.getByRole('link' , {name: type, exact: true}).click()
    }

    async verifyAppliedFilter() {
       await expect(this.page).toHaveURL(/.*straw.*/)
    }
    
    // increased specifity in order to avoid products that require prime
    async selectPurchaseableProduct() {
        const purchaseableProduct = this.page.locator('.s-result-item')
        .filter({has: this.page.getByRole('button', {name: /add to cart/i})})
        .first()

        await purchaseableProduct.getByRole('link').first().click()
    }
}