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
var headless = false;
var slowMo = 5;
exports.visitHomepage = function () { return __awaiter(_this, void 0, void 0, function () {
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
                _b = scope_1.default.context;
                return [4 /*yield*/, scope_1.default.browser.newPage()];
            case 3:
                _b.currentPage = _c.sent();
                scope_1.default.context.currentPage.setViewport({ width: 1280, height: 1024 });
                url = scope_1.default.host;
                return [4 /*yield*/, scope_1.default.context.currentPage.goto(url, {
                        waitUntil: "networkidle2"
                    })];
            case 4:
                visit = _c.sent();
                return [2 /*return*/, visit];
        }
    });
}); };
exports.shouldSeeText = function (text) { return __awaiter(_this, void 0, void 0, function () {
    var textExists, textContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                textExists = false;
                if (!scope_1.default.context.currentPage) return [3 /*break*/, 2];
                return [4 /*yield*/, scope_1.default.context.currentPage.evaluate(function () { return document.querySelector("p").textContent; })];
            case 1:
                textContent = _a.sent();
                textExists = textContent.includes(text);
                return [3 /*break*/, 3];
            case 2: throw new Error("There is no current page available.");
            case 3: return [2 /*return*/, chai_1.expect(textExists).to.true];
        }
    });
}); };
exports.focusIs = function (focus) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // tslint:disable-next-line:no-console
        console.log(focus);
        return [2 /*return*/];
    });
}); };
