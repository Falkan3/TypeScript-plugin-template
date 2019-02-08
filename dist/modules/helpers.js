"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    constructor(pluginName = '') {
        this.pluginName = pluginName;
    }
    static IsArray(item) {
        return (item && Array.isArray(item));
    }
    ;
    static IsObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    ;
    static ForEach(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        }
        else {
            for (let i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
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
    static GetDataOptions(options) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    }
    ;
    static GetClosest(elem, selector) {
        const firstChar = selector.charAt(0);
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (firstChar === '.') {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            }
            else if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            }
            else if (firstChar === '[') {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    return elem;
                }
            }
        }
        return false;
    }
    ;
    Log(msg, msgType) {
        let styling = '';
        console.log('%c>>>>>>>>>>>>>>>>>>', 'color: #ddd;');
        console.log('%c' + this.pluginName, 'font-size: 14px;');
        switch (msgType) {
            case 'error':
                styling = 'color: #f00;';
                console.log('%c' + 'ERROR', styling);
                break;
            case 'warning':
                styling = 'color: #f8e424;';
                console.log('%c' + 'WARNING', styling);
                break;
            case 'info':
                styling = 'color: #00f;';
                console.log('%c' + 'INFO', styling);
                break;
            case 'success':
                styling = 'color: #0f0;';
                console.log('%c' + 'ERROR', styling);
                break;
            default:
                styling = 'color: #8f8f8f;';
                break;
        }
        console.log('%c' + msg, styling);
        console.log('%c<<<<<<<<<<<<<<<<<<', 'color: #ddd;');
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map