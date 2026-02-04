import { type Page } from "playwright"
import { BasePage } from "./BasePage"

export class HomePage extends BasePage {
    private readonly searchBox = this.page.getByRole('searchbox', { name: 'Search Amazon.com.au' });

    async goto() {
        await this.page.goto('https://amazon.com.au')
    }

    async search(query: string) {
        await this.searchBox.click()
        await this.searchBox.fill(query)
        await this.searchBox.press('Enter')
    }
}