import * as puppeteer from "puppeteer";
import { ElementHandle } from "puppeteer";

export interface IPuppeteerService {
  click(page: puppeteer.Page, element: ElementHandle): Promise<void>;
  type(page: puppeteer.Page, text: string): Promise<void>;
}

export class PuppeteerService implements IPuppeteerService {
  async click(
    page: puppeteer.Page,
    element: ElementHandle<Element>
  ): Promise<void> {
    await page.addScriptTag({ path: "./features-temp/mouse-helper.js" });

    const model = await element.boxModel();

    if (model) {
      const x = model.content[0].x + model.width / 2;
      const y = model.content[0].y + model.height / 2;
      await page.mouse.move(x, y, {
        steps: 20
      });
    }

    return element.click({ delay: 100 });
  }
  async type(page: puppeteer.Page, text: string): Promise<void> {
    return page.keyboard.type(text);
    // return page.keyboard.type(text, { delay: 300 });
  }
}

export default new PuppeteerService();
