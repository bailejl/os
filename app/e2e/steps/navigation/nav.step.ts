import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dataManager from "../../data/data-manager";

Then(
  "They see they are able to navigate to these apps:",
  async function (appNamesTable: DataTable) {
    const appNames = dataManager.getDataTableColumnValues(appNamesTable, 0);
    for (let index = 0; index < appNames.length; index++) {
      await expect(
        this.page.getByTestId("nav-link-" + appNames[index])
      ).toBeVisible();
    }
  }
);
