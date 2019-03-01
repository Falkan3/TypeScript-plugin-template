/*
 * DateTime Helpers - module
 *
 * General data formatting functions
 */
// declare module "DateTimeHelpers" {}

export class DateTimeHelpers {

    /**
     * Get parameters from URL
     * @public
     * @static
     * @param {Date} date - (optional) date to format
     * @return {String} - ISO formatted datetime
     */
    public static GetISOTime = function (date: Date = new Date()) {
        const isoTime =
            date.getFullYear() +
            '-' + this.zeroPadNum(date.getMonth() + 1) +
            '-' + this.zeroPadNum(date.getDate()) +
            ' ' + this.zeroPadNum(date.getHours()) +
            ':' + this.zeroPadNum(date.getMinutes()) +
            ':' + this.zeroPadNum(date.getSeconds()) +
            '.' + this.zeroPadNum(date.getMilliseconds());
        return isoTime;
    };
}