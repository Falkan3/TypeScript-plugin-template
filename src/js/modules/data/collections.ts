/*
 * Collection operations - module
 *
 * Perform various operations on collections - arrays, objects
 */

export class CollectionsModule {
    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @public
     * @static
     * @param {Array|Object|NodeList} collection - Collection of items to iterate
     * @param {Function} callback Callback - function for each iteration
     * @param {Array|Object|NodeList} scope - Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    public static ForEach(collection, callback: (value, prop) => void, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    const callbackReturn = callback.call(scope, collection[prop], prop, collection);
                    if (callbackReturn === false) {
                        break;
                    }
                }
            }
        } else {
            for (let i = 0, len = collection.length; i < len; i++) {
                const callbackReturn = callback.call(scope, collection[i], i, collection);
                if (callbackReturn === false) {
                    break;
                }
            }
        }
    };

    /**
     * Merge defaults with user options
     * @public
     * @static
     * @param {Object} defaults - Default settings
     * @param {Object} options - User options
     * @returns {Object} Merged - values of defaults and options
     */
    public static Extend(defaults: object, options: object) {
        const extended = {};
        this.ForEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        }, undefined);
        this.ForEach(options, function (value, prop) {
            extended[prop] = options[prop];
        }, undefined);
        return extended;
    };
}