"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionsModule {
    static ForEach(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    const callbackReturn = callback.call(scope, collection[prop], prop, collection);
                    if (callbackReturn === false) {
                        break;
                    }
                }
            }
        }
        else {
            for (let i = 0, len = collection.length; i < len; i++) {
                const callbackReturn = callback.call(scope, collection[i], i, collection);
                if (callbackReturn === false) {
                    break;
                }
            }
        }
    }
    ;
    static Extend(defaults, options) {
        const extended = {};
        this.ForEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        }, undefined);
        this.ForEach(options, function (value, prop) {
            extended[prop] = options[prop];
        }, undefined);
        return extended;
    }
    ;
}
exports.CollectionsModule = CollectionsModule;
//# sourceMappingURL=collections.js.map