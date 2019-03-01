/*
 * Formatting operations - module
 *
 * Perform various formatting operations
 */

export class FormattersModule {
    /**
     * Add left padding to a number
     * @public
     * @static
     * @param  {Number} number - the number to be formatted
     * @param  {Number} padCount - the total length of number + padding
     * @returns {String|Number}
     */
    public static PadLeftNum = function (number: number, padCount: number = 1) {
        const _this = this;

        if (!_this.IsNumber(number)) return number;

        const numberLength = _this.NumberLength(number);

        if (numberLength < padCount) {
            const padCountDiff = padCount - numberLength; // fill in only the difference between pad count and the given number's length
            return "0".repeat(padCountDiff) + number;
        }
        return number;
    };

    /**
     * Convert data-options attribute into an object of key/value pairs
     * @public
     * @static
     * @param {String} options - Link-specific options as a data attribute string
     * @returns {Object}
     */
    public static GetDataOptions(options: string) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    };

    /**
     * Format a JSON object into a query-like string (example: param1=param1_val&param2=param2_val)
     * @public
     * @static
     * @param  {Object} obj - JSON object to be formatted
     * @param  {String} prefix - if specified, all parameters in the formatted string will be nested as prefix => parameter (e.g. prefix[param1]=param1_val&prefix[param2]=param2_val)
     * @returns {String}
     */
    public static ObjectToString = function (obj: object, prefix = null) {
        const _this = this;
        const formattedString = [];

        _this.ForEach(obj, function (value, prop) {
            const innPrefix = prefix ? prefix + "[" + prop + "]" : prop, innValue = value;

            const formattedValue = (innValue !== null && _this.IsObject(innValue)) ?
                _this.ObjectToString(innValue, innPrefix) :
                encodeURIComponent(innPrefix) + "=" + encodeURIComponent(innValue);
            formattedString.push(formattedValue);
        }, _this);

        return formattedString.join("&");
    };

    /**
     * Return a hash generated from the inputted string
     * @public
     * @static
     * @param  {String} string - input string to be hashed
     * @returns {String}
     */
    public static HashString = function (string: string) {
        let hash = 0;
        if (string.length === 0) return hash;
        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}