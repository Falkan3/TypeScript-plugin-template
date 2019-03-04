/*
 * Type checker - module
 *
 * Check the type of given input
 */

export class TypeModule {
    public static IsInteger(input) {
        return parseInt(input) === input;
    }

    public static IsFloat(input) {
        return parseFloat(input) === input;
    }

    public static IsNumber(input) {
        return this.IsInteger(input) || this.IsFloat(input);
    }

    /**
     * Return the numbers length
     * @public
     * @static
     * @param {Number} number - the number to check the length of
     * @returns {Number} - the length of the given number
     */
    public static NumberLength(number: number) {
        return Math.ceil(Math.log10(number + 1));
    }

    /**
     * Check if an item is an array
     * @public
     * @static
     * @param {Array} item - The item to be checked
     * @returns {Boolean}
     */
    public static IsArray(item: Array<any>) {
        return (item && Array.isArray(item));
    };

    /**
     * Check if an item is an object
     * @public
     * @static
     * @param {Object} item The item to be checked
     * @returns {Boolean}
     */
    public static IsObject(item: object) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    };

    /**
     * Check if an item is an HTML DOM object
     * @public
     * @static
     * @param {Object} item - The item to be checked
     * @returns {Boolean}
     */
    public static IsElement(item: object) {
        return item instanceof Element || item instanceof HTMLDocument;
    }
}