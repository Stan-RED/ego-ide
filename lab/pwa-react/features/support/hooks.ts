import { After, AfterAll, Before } from "cucumber";

import { ApiServer } from "../../server/index";
import { StorageService } from "../../server/StorageService";
import scope from "./scope";

Before(async () => {
  // You can clean up database models here
  // scope.browser = await scope.driver.launch();
  // scope.context.currentPage = await scope.browser.newPage();
  // await scope.context.currentPage.goto(scope.host);
  scope.context.storage = new StorageService();
  scope.context.server = new ApiServer(scope.context.storage, 3002);
  scope.context.server.serve();
});

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  // close the web page down
  if (scope.browser && scope.context.currentPage) {
    await scope.context.currentPage.close();
    delete scope.context.currentPage;
  }

  if (scope.context.server) {
    scope.context.server.close();
    scope.context.server = null;
  }
  if (scope.context.storage) {
    scope.context.storage = null;
  }
});

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) {
    await scope.browser.close();
  }
});
