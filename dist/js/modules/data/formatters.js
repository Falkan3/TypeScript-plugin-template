"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
const types_1 = require("./types");
class FormattersModule {
    static PadLeftNum(number, padCount = 1) {
        const _this = this;
        if (!types_1.TypeModule.IsNumber(number))
            return number;
        const numberLength = types_1.TypeModule.NumberLength(number);
        if (numberLength < padCount) {
            const padCountDiff = padCount - numberLength;
            return "0".repeat(padCountDiff) + number;
        }
        return number;
    }
    ;
    static GetDataOptions(options) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    }
    ;
    static ObjectToString(obj, prefix = null) {
        const _this = this;
        const formattedString = [];
        collections_1.CollectionsModule.ForEach(obj, function (value, prop) {
            const innPrefix = prefix ? prefix + "[" + prop + "]" : prop, innValue = value;
            const formattedValue = (innValue !== null && types_1.TypeModule.IsObject(innValue)) ?
                _this.ObjectToString(innValue, innPrefix) :
                encodeURIComponent(innPrefix) + "=" + encodeURIComponent(innValue);
            formattedString.push(formattedValue);
        }, _this);
        return formattedString.join("&");
    }
    ;
    static HashString(string) {
        let hash = 0;
        if (string.length === 0)
            return hash;
        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
    ;
    static EscapeRegExp(regExp) {
        return regExp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    ;
}
exports.FormattersModule = FormattersModule;
//# sourceMappingURL=formatters.js.map