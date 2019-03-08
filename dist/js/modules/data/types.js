"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeModule {
    static IsInteger(input) {
        return parseInt(input) === input;
    }
    ;
    static IsFloat(input) {
        return parseFloat(input) === input;
    }
    ;
    static IsNumber(input) {
        return this.IsInteger(input) || this.IsFloat(input);
    }
    ;
    static NumberLength(number) {
        return Math.ceil(Math.log10(number + 1));
    }
    ;
    static IsArray(item) {
        return (item && Array.isArray(item));
    }
    ;
    static IsObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    ;
    static IsElement(item) {
        return item instanceof Element || item instanceof HTMLDocument;
    }
    ;
}
exports.TypeModule = TypeModule;
//# sourceMappingURL=types.js.map