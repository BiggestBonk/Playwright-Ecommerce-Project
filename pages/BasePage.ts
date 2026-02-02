import { Page } from "playwright";

export class BasePage {
    constructor(protected page: Page) {}

    async goto(url:string) {
        await this.page.goto(url)
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle')
    }

    async getPageTitle() {
        return await this.page.title()
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({path: `screenshots/${name}.png`})
    }
}