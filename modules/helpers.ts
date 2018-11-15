//
// Methods
//

// declare module "Helpers" {}

export class Helpers {
    pluginName;

    constructor(pluginName :string = '') {
        this.pluginName = pluginName;
    }

    /**
     * Check if an item is an array
     * @private
     * @param {Array} item The item to be checked
     * @returns {Boolean}
     */
    public IsArray  (item: Array<any>) {
        return (item && Array.isArray(item));
    };

    /**
     * Check if an item is an object
     * @private
     * @param {Object} item The item to be checked
     * @returns {Boolean}
     */
    public IsObject  (item: object) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    };

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    public ForEach(collection, callback: (value, prop) => void, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (let i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    public Extend(defaults, options) {
        const extended = {};
        this.ForEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        }, undefined);
        this.ForEach(options, function (value, prop) {
            extended[prop] = options[prop];
        }, undefined);
        return extended;
    };

    /**
     * Convert data-options attribute into an object of key/value pairs
     * @private
     * @param {String} options Link-specific options as a data attribute string
     * @returns {Object}
     */
    public GetDataOptions(options: string) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    };

    /**
     * Get the closest matching element up the DOM tree
     * @param {Element} elem Starting element
     * @param {String} selector Selector to match against (class, ID, or data attribute)
     * @return {Boolean|Element} Returns false if not match found
     */
    public GetClosest(elem, selector: string) {
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

    public Log(msg: string, msgType: string) {
        let styling = '';
        console.log('%c>>>>>>>>>>>>>>>>>>', 'color: #ddd;');
        console.log('%c' + this.pluginName, 'font-size: 14px;');
        switch(msgType) {
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