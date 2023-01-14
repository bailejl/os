// import { ICustomWorld } from "../../support/custom-world";
import { config } from "../../support/config";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import dataManager from "../../data/data-manager";
import { DashboardPage } from "./dashboard-page";
import { VerifyPageLoad } from "./login-interfaces";

Given("They are ready to login", async function () {
  const page = new LoginPage(this.page!, config.BASE_URL);
  await page.goto();
});

When(
  "{string} logs in with email and password",
  async function (nameOrAlias: string) {
    const page = new LoginPage(this.page!, config.BASE_URL);
    const data = dataManager.getData(nameOrAlias);
    await page.goto();
    await page.typeEmailAddress(data["email"]);
    await page.typePassword(data["password"]);
    await page.submitLogin();
  }
);

Then("They see the {string} page", async function (pageName: string) {
  let page: VerifyPageLoad;
  if (pageName.toLowerCase() == "dashboard") {
    page = new DashboardPage(this.page!, config.BASE_URL);
    await page.verifyPageLoad();
  } else if (pageName.toLowerCase() == "login") {
    page = new LoginPage(this.page!, config.BASE_URL);
    await page.verifyPageLoad();
  } else {
    expect(false).toBeTruthy();
  }
});
