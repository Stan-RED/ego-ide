"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("cucumber");
var scope_1 = __importDefault(require("./scope"));
var puppeteer = require("puppeteer");
// tslint:disable-next-line:only-arrow-functions
exports.World = function () {
    scope_1.default.driver = puppeteer;
    scope_1.default.context = {};
    scope_1.default.host = "http://localhost:3000";
};
cucumber_1.setWorldConstructor(exports.World);
