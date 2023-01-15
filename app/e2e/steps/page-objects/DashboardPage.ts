import { expect, Locator, Page } from "@playwright/test";
import { AppPage } from "./AppPage";
import { VerifyPageLoad } from "./login-interfaces";

export class DashboardPage extends AppPage implements VerifyPageLoad {
  readonly logoImg: Locator;
  readonly searchInput: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.logoImg = page.locator("img", { hasText: "Your Company" });
    this.searchInput = page.getByLabel("Search");
  }

  async goto() {
    await super.page.goto(super.baseUrl + "/login");
  }

  async verifyPageLoad(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
  }
}
