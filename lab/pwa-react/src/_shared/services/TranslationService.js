"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WORK: Use me!
var TranslationService = /** @class */ (function () {
    function TranslationService() {
    }
    TranslationService.prototype.get = function (fqn) {
        return fqn.substr(fqn.lastIndexOf(".") + 1);
    };
    return TranslationService;
}());
exports.TranslationService = TranslationService;
var translationService = new TranslationService();
exports.default = translationService;
