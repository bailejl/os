import { Page } from "@playwright/test";

export class AppPage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async signOut() {
    await this.page.getByTestId("avatar-button").click();
    await this.page.getByTestId("sign-out-button").click();
  }
}
