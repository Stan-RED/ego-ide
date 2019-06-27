import { expect } from "chai";

import scope from "./scope";

const headless = false;
const slowMo = 5;

export const visitHomepage = async () => {
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless, slowMo });
  }
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  const url = scope.host;
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: "networkidle2"
  });
  return visit;
};

export const shouldSeeText = async (text: string) => {
  let textExists: boolean = false;

  if (scope.context.currentPage) {
    const textContent: string = await scope.context.currentPage.evaluate(
      () => (document as any).querySelector("p").textContent
    );

    textExists = textContent.includes(text);
  } else {
    throw new Error("There is no current page available.");
  }

  return expect(textExists).to.true;
};

export const focusIs = async (focus: string) => {
  // tslint:disable-next-line:no-console
  console.log(focus);
};
