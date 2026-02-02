import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    private readonly productTitle = this.page.locator('#productTitle')
    private readonly addToCartButton = this.page.locator('[id="submit.add-to-cart"]')

    constructor(page:Page) {
        super(page)
    }

    async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() || ''
    }

    async addToCart() {
        await this.addToCartButton.click()
    }
}