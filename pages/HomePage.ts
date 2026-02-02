import { type Page } from "playwright"
import { BasePage } from "./BasePage"

export class HomePage extends BasePage {
    private readonly searchBox = this.page.getByRole('searchbox', { name: 'Search Amazon.com.au' });

    constructor(page: Page) {
        super(page)
    }
    
    async goto() {
        await super.goto('https://amazon.com.au')
    }

    async search(query: string) {
        await this.searchBox.click()
        await this.searchBox.fill(query)
        await this.searchBox.press('Enter')
    }
}