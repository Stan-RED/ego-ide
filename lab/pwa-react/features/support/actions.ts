import { expect } from "chai";
import { Page } from "puppeteer";

import scope from "./scope";

import { StorageItem } from "../../server/StorageService";
import translationService from "../../src/_shared/services/TranslationService";
import { timeout } from "./helpers";
import puppeteerService from "./PuppeteerService";

const headless = false;
const slowMo = 5;

export const currentUserIs = async (user: string) => {
  // TODO: Current user is set to {userId} without an UI representation.
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless, slowMo });
  }
  if (!scope.context.currentPage) {
    scope.context.currentPage = await scope.browser.newPage();
    scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  }
  const url = scope.host;
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: "networkidle2"
  });

  return visit;
};

export const focusWas = async (focus: string) => {
  // TODO: Sets the current focus to the {id} without an UI representation.
  // tslint:disable-next-line:no-console
  console.log("Focus is:", focus);
};

export const add = async (
  linkInheritor: string,
  linkInheritorIdAndName: string
) => {
  const menuItemText = translationService.get(linkInheritor);
  const currentAction = translationService.get(`${linkInheritor}.add`);

  // WORK: Just print browser's console to node's console.
  if (scope.context.currentPage) {
    scope.context.currentPage.on("console", (msg: any) => {
      // for (let i = 0; i < msg.args.length; ++i) {
      // tslint:disable-next-line:no-console
      console.log(msg);
      // }
    });

    await select(menuItemText);

    const actions = await scope.context.currentPage.$x(
      `//span[contains(text(), '${currentAction}')]`
    );

    // const actions = await scope.context.currentPage.$x(
    //   `//span[contains(text(), '${currentAction}')]`
    // );
    // tslint:disable-next-line:no-console
    // console.log(actions);
    if (actions.length > 0) {
      // await actions[0].click();
      await puppeteerService.click(scope.context.currentPage, actions[0]);
    }

    // await timeout(1000);

    const name = await scope.context.currentPage.$x(
      `//label[contains(text(), 'Name')]`
    );

    if (name.length > 0) {
      // await name[0].click();
      await puppeteerService.click(scope.context.currentPage, name[0]);
    }

    // await scope.context.currentPage.keyboard.type(linkInheritorIdAndName);
    await puppeteerService.type(
      scope.context.currentPage,
      linkInheritorIdAndName
    );

    const submit = await scope.context.currentPage.$x(
      `//input[@type='submit']`
    );

    if (submit.length > 0) {
      // await submit[0].click();
      await puppeteerService.click(scope.context.currentPage, submit[0]);
    }

    // await timeout(1000);
  } else {
    throw new Error("There is no current page available.");
  }
};

export const focusIs = async (focus: string) => {
  let currentFocus: string;

  if (scope.context.currentPage) {
    currentFocus = await scope.context.currentPage.evaluate(
      () => (document as any).querySelector('[aria-label="focus"]').textContent
    );
  } else {
    throw new Error("There is no current page available.");
  }

  return expect(currentFocus).to.equal(focus);
};

export const select = async (item: string) => {
  if (scope.context.currentPage) {
    // const linkHandlers = await scope.context.currentPage.$x(
    //   `//li[contains(text(), ${item})]`
    // );

    const linkHandlers = await scope.context.currentPage.$x(
      `//li/span[./text()='${item}']`
    );

    if (linkHandlers.length > 0) {
      // await linkHandlers[0].click();
      await puppeteerService.click(scope.context.currentPage, linkHandlers[0]);
    }
  } else {
    throw new Error("There is no current page available.");
  }
};

export const widgetList = async (widget: string, table: any) => {
  if (scope.context.currentPage !== undefined) {
    const tableRaw: [any[]] = table.raw();

    await timeout(1500);

    // tslint:disable-next-line:prefer-for-of
    for (const row of tableRaw) {
      const item = await (scope.context.currentPage as Page).$x(
        //   WORK:
        `//li[text()='${row[1]}']`
      );
      expect(item.length).to.be.above(0);
    }
  } else {
    throw new Error("There is no current page available.");
  }
};

/**
 * Non-UI steps
 */
export const givenUser = async (user: string) => {
  if (scope.context.storage) {
    await scope.context.storage.create([
      new StorageItem({
        id: user,
        user: {}
      })
    ]);
  } else {
    throw new Error("There is no storage in the context.");
  }
};

export const userHadAspect = async (
  userId: string,
  aspect: string,
  aspectName: string
) => {
  if (scope.context.storage) {
    scope.context.storage.update([
      new StorageItem({
        id: userId,
        name: {
          name: aspectName
        },
        [aspect]: {}
      })
    ]);
  } else {
    throw new Error("There is no storage in the context.");
  }
};
