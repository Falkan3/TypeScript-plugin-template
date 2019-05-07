/*
 * DOM operations - module
 *
 * Perform various operations on DOM elements
 */

import {DataHelpers} from "../module__data_helpers";

export class DOMModule {
    /**
     * Document ready event listener with callback
     * @public
     * @static
     * @param {Function} callback - callback function to be called when document is ready
     */
    public static DOMReady(callback: () => void) {
        if (document.readyState === "loading") {
            document.addEventListener('DOMContentLoaded', callback);
        }
        else {
            callback();
        }
    }

    /**
     * Window ready event listener with callback
     * @public
     * @static
     * @param {Function} callback - callback function to be called when window is ready
     */
    public static windowReady(callback: () => void) {
        if (document.readyState === 'complete') {
            callback();
        }
        else {
            window.addEventListener('load', callback);
        }
    }

    /**
     * Get the closest matching element up the DOM tree
     * @public
     * @static
     * @param {Element} elem - Starting element
     * @param {String} selector - Selector to match against (class, ID, or data attribute)
     * @returns {Boolean|Element} - Returns false if not match found
     */
    public static GetClosest(elem, selector: string) {
        const firstChar = selector.charAt(0);
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (firstChar === '.') {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            } else if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            } else if (firstChar === '[') {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    return elem;
                }
            }
        }
        return false;
    };

    /**
     * Create a DOM object
     * @public
     * @static
     * @param {Object} options - Given parameters, to be merged with default parameters
     * @param {String} tag - HTML tag name
     * @returns {Element|null} - Returns a DOM element
     */
    public static CreateDOMObject(options: object = {}, tag: string = 'div') {
        let element = null;

        switch (tag) {
            case 'img':
                const defaults = {
                    attributes: {
                        src: '',
                        alt: '',
                    }
                };
                const settings = <any>DataHelpers.Collections.Extend(defaults, options || {});
                element = document.createElement(tag);
                DataHelpers.Collections.ForEach(settings.attributes, function (value, prop) {
                    element.setAttribute(prop, value);
                }, this);
                break;
        }

        return element;
    };
}