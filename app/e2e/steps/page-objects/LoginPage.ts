import { expect, Locator, Page } from "@playwright/test";
import { VerifyPageLoad } from "./login-interfaces";

export class LoginPage implements VerifyPageLoad {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.emailAddressInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.submitBtn = page.getByTestId("sign-in");
    this.baseUrl = baseUrl;
  }

  async verifyPageLoad(): Promise<void> {
    await expect(this.submitBtn).toBeVisible();
  }

  async goto() {
    await this.page.goto(this.baseUrl + "/login");
  }

  async typeEmailAddress(email: string) {
    await this.emailAddressInput.click();
    await this.emailAddressInput.fill(email);
  }

  async typePassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.submitBtn.click();
  }
}
