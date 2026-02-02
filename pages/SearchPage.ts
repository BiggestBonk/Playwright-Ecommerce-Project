import { BasePage } from "./BasePage"
import { expect } from "playwright/test"
export class SearchPage extends BasePage {
    private readonly resultItems = this.page.locator('.s-result-item')

    async applyFilter(type: string) {
       await this.page.locator('#filter- li').filter({ hasText: `${type}` }).click()
    }

    async verifyAppliedFilter(filterName:string) {
       await expect(this.page.getByRole('heading', { name: '1-48 of over 1,000 results for "pipe cleaners"', exact: false })).toContainText(filterName)
    }
    
    // increased specifity in order to avoid products that require prime
    async selectPurchaseableProduct() {
        const purchaseableProduct = this.page.locator('.s-result-item')
        .filter({has: this.page.getByRole('button', {name: /add to cart/i})})
        .first()

        await purchaseableProduct.getByRole('link').first().click()
    }
}