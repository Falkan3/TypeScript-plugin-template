"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module__data_helpers_1 = require("./module__data_helpers");
class DateTimeHelpers {
}
DateTimeHelpers.GetISOTime = function (date = new Date()) {
    const isoTime = date.getFullYear() +
        '-' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getMonth() + 1) +
        '-' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getDate()) +
        ' ' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getHours()) +
        ':' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getMinutes()) +
        ':' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getSeconds()) +
        '.' + module__data_helpers_1.DataHelpers.Formatters.PadLeftNum(date.getMilliseconds());
    return isoTime;
};
exports.DateTimeHelpers = DateTimeHelpers;
//# sourceMappingURL=module__datetime_helpers.js.map