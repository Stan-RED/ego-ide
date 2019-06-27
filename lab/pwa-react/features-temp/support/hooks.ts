import scope from "./scope";

import { After, AfterAll, Before } from "cucumber";

Before(async () => {
  // You can clean up database models here
  // scope.browser = await scope.driver.launch();
  // scope.context.currentPage = await scope.browser.newPage();
  // await scope.context.currentPage.goto(scope.host);
});

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  // close the web page down
  if (scope.browser && scope.context.currentPage) {
    await scope.context.currentPage.close();
    delete scope.context.currentPage;
  }

});

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) {
    await scope.browser.close();
  }
});
