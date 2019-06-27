"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:ordered-imports
var cucumber_1 = require("cucumber");
var actions_1 = require("../support/actions");
cucumber_1.Given("^Focus is? (.*)$", actions_1.focusIs);
// Then("I should see {string}", shouldSeeText);
