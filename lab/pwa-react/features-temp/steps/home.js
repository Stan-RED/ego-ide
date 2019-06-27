"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:ordered-imports
var cucumber_1 = require("cucumber");
var actions_1 = require("../support/actions");
cucumber_1.Given('I am on the home page', actions_1.visitHomepage);
cucumber_1.Then('I should see {string}', actions_1.shouldSeeText);
