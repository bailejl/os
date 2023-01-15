// import { ICustomWorld } from "../../support/custom-world";
import { config } from "../../support/config";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import dataManager from "../../data/data-manager";
import { DashboardPage } from "../page-objects/DashboardPage";
import { VerifyPageLoad } from "../page-objects/login-interfaces";

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

Then("They see the {string}", async function (pageName: string) {
  let page: VerifyPageLoad;
  if (pageName.toLowerCase() == "dashboard") {
    page = new DashboardPage(this.page!, config.BASE_URL);
    await page.verifyPageLoad();
  } else if (pageName.toLowerCase() == "login") {
    page = new LoginPage(this.page!, config.BASE_URL);
    await page.verifyPageLoad();
  } else if (pageName.toLowerCase() == "handbook") {
    page = new LoginPage(this.page!, config.BASE_URL);
    await page.verifyPageLoad();
  } else {
    expect(false).toBeTruthy();
  }
});

When("They sign out", async function () {
  const page = new DashboardPage(this.page!, config.BASE_URL);
  await page.signOut();
});

Given("No one is logged in", async function () {});

Given("They request to see {string}", async function (pageName: string) {
  let page;
  if (pageName.toLowerCase() == "dashboard") {
    page = new DashboardPage(this.page!, config.BASE_URL);
    await page.goto();
  } else if (pageName.toLowerCase() == "login") {
    page = new LoginPage(this.page!, config.BASE_URL);
    await page.goto();
  } else if (pageName.toLowerCase() == "handbook") {
    page = new LoginPage(this.page!, config.BASE_URL);
    await page.goto();
  } else {
    expect(false).toBeTruthy();
  }
});
