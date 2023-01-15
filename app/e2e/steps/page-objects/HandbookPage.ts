import { expect, Locator, Page } from "@playwright/test";
import { AppPage } from "./AppPage";
import { VerifyPageLoad } from "./login-interfaces";

export class HandbookPage extends AppPage implements VerifyPageLoad {
  readonly handbookTxt: Locator;
  readonly searchInput: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
    this.handbookTxt = page.locator("h1", { hasText: "Handbook" });
    this.searchInput = page.getByLabel("Search");
  }

  async goto() {
    await super.page.goto(super.baseUrl + "/handbook");
  }

  async verifyPageLoad(): Promise<void> {
    await expect(this.handbookTxt).toBeVisible();
  }
}
