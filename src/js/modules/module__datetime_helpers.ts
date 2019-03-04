/*
 * DateTime Helpers - module
 *
 * General data formatting functions
 */
// declare module "DateTimeHelpers" {}

// libs

// standard modules
import {DataHelpers} from "./module__data_helpers";


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
            '-' + DataHelpers.Formatters.PadLeftNum(date.getMonth() + 1) +
            '-' + DataHelpers.Formatters.PadLeftNum(date.getDate()) +
            ' ' + DataHelpers.Formatters.PadLeftNum(date.getHours()) +
            ':' + DataHelpers.Formatters.PadLeftNum(date.getMinutes()) +
            ':' + DataHelpers.Formatters.PadLeftNum(date.getSeconds()) +
            '.' + DataHelpers.Formatters.PadLeftNum(date.getMilliseconds());
        return isoTime;
    };
}