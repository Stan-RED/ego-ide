"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var scope_1 = __importDefault(require("./scope"));
var StorageService_1 = require("../../server/StorageService");
var TranslationService_1 = __importDefault(require("../../src/_shared/services/TranslationService"));
var helpers_1 = require("./helpers");
var PuppeteerService_1 = __importDefault(require("./PuppeteerService"));
var headless = false;
var slowMo = 5;
exports.currentUserIs = function (user) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, url, visit;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!!scope_1.default.browser) return [3 /*break*/, 2];
                _a = scope_1.default;
                return [4 /*yield*/, scope_1.default.driver.launch({ headless: headless, slowMo: slowMo })];
            case 1:
                _a.browser = _c.sent();
                _c.label = 2;
            case 2:
                if (!!scope_1.default.context.currentPage) return [3 /*break*/, 4];
                _b = scope_1.default.context;
                return [4 /*yield*/, scope_1.default.browser.newPage()];
            case 3:
                _b.currentPage = _c.sent();
                scope_1.default.context.currentPage.setViewport({ width: 1280, height: 1024 });
                _c.label = 4;
            case 4:
                url = scope_1.default.host;
                return [4 /*yield*/, scope_1.default.context.currentPage.goto(url, {
                        waitUntil: "networkidle2"
                    })];
            case 5:
                visit = _c.sent();
                return [2 /*return*/, visit];
        }
    });
}); };
exports.focusWas = function (focus) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: Sets the current focus to the {id} without an UI representation.
        // tslint:disable-next-line:no-console
        console.log("Focus is:", focus);
        return [2 /*return*/];
    });
}); };
exports.add = function (linkInheritor, linkInheritorIdAndName) { return __awaiter(_this, void 0, void 0, function () {
    var menuItemText, currentAction, actions, name_1, submit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuItemText = TranslationService_1.default.get(linkInheritor);
                currentAction = TranslationService_1.default.get(linkInheritor + ".add");
                if (!scope_1.default.context.currentPage) return [3 /*break*/, 12];
                scope_1.default.context.currentPage.on("console", function (msg) {
                    // for (let i = 0; i < msg.args.length; ++i) {
                    // tslint:disable-next-line:no-console
                    console.log(msg);
                    // }
                });
                return [4 /*yield*/, exports.select(menuItemText)];
            case 1:
                _a.sent();
                return [4 /*yield*/, scope_1.default.context.currentPage.$x("//span[contains(text(), '" + currentAction + "')]")];
            case 2:
                actions = _a.sent();
                if (!(actions.length > 0)) return [3 /*break*/, 4];
                // await actions[0].click();
                return [4 /*yield*/, PuppeteerService_1.default.click(scope_1.default.context.currentPage, actions[0])];
            case 3:
                // await actions[0].click();
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, scope_1.default.context.currentPage.$x("//label[contains(text(), 'Name')]")];
            case 5:
                name_1 = _a.sent();
                if (!(name_1.length > 0)) return [3 /*break*/, 7];
                // await name[0].click();
                return [4 /*yield*/, PuppeteerService_1.default.click(scope_1.default.context.currentPage, name_1[0])];
            case 6:
                // await name[0].click();
                _a.sent();
                _a.label = 7;
            case 7: 
            // await scope.context.currentPage.keyboard.type(linkInheritorIdAndName);
            return [4 /*yield*/, PuppeteerService_1.default.type(scope_1.default.context.currentPage, linkInheritorIdAndName)];
            case 8:
                // await scope.context.currentPage.keyboard.type(linkInheritorIdAndName);
                _a.sent();
                return [4 /*yield*/, scope_1.default.context.currentPage.$x("//input[@type='submit']")];
            case 9:
                submit = _a.sent();
                if (!(submit.length > 0)) return [3 /*break*/, 11];
                // await submit[0].click();
                return [4 /*yield*/, PuppeteerService_1.default.click(scope_1.default.context.currentPage, submit[0])];
            case 10:
                // await submit[0].click();
                _a.sent();
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12: throw new Error("There is no current page available.");
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.focusIs = function (focus) { return __awaiter(_this, void 0, void 0, function () {
    var currentFocus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!scope_1.default.context.currentPage) return [3 /*break*/, 2];
                return [4 /*yield*/, scope_1.default.context.currentPage.evaluate(function () { return document.querySelector('[aria-label="focus"]').textContent; })];
            case 1:
                currentFocus = _a.sent();
                return [3 /*break*/, 3];
            case 2: throw new Error("There is no current page available.");
            case 3: return [2 /*return*/, chai_1.expect(currentFocus).to.equal(focus)];
        }
    });
}); };
exports.select = function (item) { return __awaiter(_this, void 0, void 0, function () {
    var linkHandlers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!scope_1.default.context.currentPage) return [3 /*break*/, 4];
                return [4 /*yield*/, scope_1.default.context.currentPage.$x("//li/span[./text()='" + item + "']")];
            case 1:
                linkHandlers = _a.sent();
                if (!(linkHandlers.length > 0)) return [3 /*break*/, 3];
                // await linkHandlers[0].click();
                return [4 /*yield*/, PuppeteerService_1.default.click(scope_1.default.context.currentPage, linkHandlers[0])];
            case 2:
                // await linkHandlers[0].click();
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4: throw new Error("There is no current page available.");
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.widgetList = function (widget, table) { return __awaiter(_this, void 0, void 0, function () {
    var tableRaw, _i, tableRaw_1, row, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(scope_1.default.context.currentPage !== undefined)) return [3 /*break*/, 6];
                tableRaw = table.raw();
                return [4 /*yield*/, helpers_1.timeout(1500)];
            case 1:
                _a.sent();
                _i = 0, tableRaw_1 = tableRaw;
                _a.label = 2;
            case 2:
                if (!(_i < tableRaw_1.length)) return [3 /*break*/, 5];
                row = tableRaw_1[_i];
                return [4 /*yield*/, scope_1.default.context.currentPage.$x(
                    //   WORK:
                    "//li[text()='" + row[1] + "']")];
            case 3:
                item = _a.sent();
                chai_1.expect(item.length).to.be.above(0);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6: throw new Error("There is no current page available.");
            case 7: return [2 /*return*/];
        }
    });
}); };
/**
 * Non-UI steps
 */
exports.givenUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!scope_1.default.context.storage) return [3 /*break*/, 2];
                return [4 /*yield*/, scope_1.default.context.storage.create([
                        new StorageService_1.StorageItem({
                            id: user,
                            user: {}
                        })
                    ])];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2: throw new Error("There is no storage in the context.");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userHadAspect = function (userId, aspect, aspectName) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        if (scope_1.default.context.storage) {
            scope_1.default.context.storage.update([
                new StorageService_1.StorageItem((_a = {
                        id: userId,
                        name: {
                            name: aspectName
                        }
                    },
                    _a[aspect] = {},
                    _a))
            ]);
        }
        else {
            throw new Error("There is no storage in the context.");
        }
        return [2 /*return*/];
    });
}); };
