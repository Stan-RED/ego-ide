
import { setWorldConstructor } from "cucumber";

import scope from "./scope";

const puppeteer = require("puppeteer");

// tslint:disable-next-line:only-arrow-functions
export const World = function () {
  scope.driver = puppeteer;
  scope.context = {};
  scope.host = `http://localhost:3000`;
};

setWorldConstructor(World);
