import { expect, Locator, Page } from "@playwright/test";
import { VerifyPageLoad } from "./login-interfaces";

export class DashboardPage implements VerifyPageLoad {
  readonly page: Page;
  readonly logoImg: Locator;
  readonly baseUrl: string;
  readonly searchInput: Locator;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.logoImg = page.locator("img", { hasText: "Your Company" });
    this.searchInput = page.getByLabel("Search");
    this.baseUrl = baseUrl;
  }

  async goto() {
    await this.page.goto(this.baseUrl + "/login");
  }

  async verifyPageLoad(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
  }
}
