"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module__data_helpers_1 = require("../module__data_helpers");
class DOMModule {
    static DOMReady(callback) {
        if (document.readyState === "loading") {
            document.addEventListener('DOMContentLoaded', callback);
        }
        else {
            callback();
        }
    }
    static windowReady(callback) {
        if (document.readyState === 'complete') {
            callback();
        }
        else {
            window.addEventListener('load', callback);
        }
    }
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
    static CreateDOMObject(options = {}, tag = 'div') {
        let element = null;
        switch (tag) {
            case 'img':
                const defaults = {
                    attributes: {
                        src: '',
                        alt: '',
                    }
                };
                const settings = module__data_helpers_1.DataHelpers.Collections.Extend(defaults, options || {});
                element = document.createElement(tag);
                module__data_helpers_1.DataHelpers.Collections.ForEach(settings.attributes, function (value, prop) {
                    element.setAttribute(prop, value);
                }, this);
                break;
        }
        return element;
    }
    ;
}
exports.DOMModule = DOMModule;
//# sourceMappingURL=dom.js.map