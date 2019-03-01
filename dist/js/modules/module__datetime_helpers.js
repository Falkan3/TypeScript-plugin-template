"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateTimeHelpers {
}
DateTimeHelpers.GetISOTime = function (date = new Date()) {
    const isoTime = date.getFullYear() +
        '-' + this.zeroPadNum(date.getMonth() + 1) +
        '-' + this.zeroPadNum(date.getDate()) +
        ' ' + this.zeroPadNum(date.getHours()) +
        ':' + this.zeroPadNum(date.getMinutes()) +
        ':' + this.zeroPadNum(date.getSeconds()) +
        '.' + this.zeroPadNum(date.getMilliseconds());
    return isoTime;
};
exports.DateTimeHelpers = DateTimeHelpers;
//# sourceMappingURL=module__datetime_helpers.js.map