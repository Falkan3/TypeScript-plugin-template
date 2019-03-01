"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_example_1 = require("../config/environment.example");
const module__data_helpers_1 = require("./module__data_helpers");
class URLHelpers {
    constructor() {
    }
    static GetURLParameters(url) {
        if (typeof (url) === "undefined") {
            url = window.location.href;
        }
        var b = {}, c = url.indexOf("?");
        if (-1 == c)
            return b;
        for (let d = url.substring(c + 1), e = d.split("&"), f = 0; f < e.length; f++) {
            const g = e[f].split("=");
            b[g[0]] = g[1];
        }
        return b;
    }
    ;
    static GetURLParameter(url = location.search, name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }
    static AppendURLParameters(url = window.location.href, params) {
        if (window.URLSearchParams) {
            const query = new URLSearchParams(window.location.search);
            module__data_helpers_1.DataHelpers.Collections.ForEach(params, function (_value, _prop) {
                query.append(_prop, _value);
            }, this);
            return this.GetURLWithoutQuery(url) + '?' + query.toString();
        }
        else {
            let query = document.location.search;
            module__data_helpers_1.DataHelpers.Collections.ForEach(params, function (_value, _prop) {
                const key = encodeURIComponent(_prop);
                const val = encodeURIComponent(_value);
                var key_val = key + "=" + val;
                var regex = new RegExp("(&|\\?)" + key + "=[^\&]*");
                query = query.replace(regex, "$1" + key_val);
                if (!RegExp.$1) {
                    query += (query.length > 0 ? '&' : '?') + key_val;
                }
            }, this);
            return this.GetURLWithoutQuery(url) + '?' + query;
        }
    }
    static GetURLWithoutQuery(url = window.location.href) {
        return url.split(/[?#]/)[0];
    }
    static HasSource(url = window.location.href) {
        const self = this;
        const externalParams = environment_example_1.Environment.requiredExternalParams;
        let conditionsMet = { or: true, and: true };
        if (typeof (externalParams.or) !== "undefined" && module__data_helpers_1.DataHelpers.Types.IsArray(externalParams.or)) {
            module__data_helpers_1.DataHelpers.Collections.ForEach(externalParams.or, function (value, prop) {
                let conditionsSatisfied = false;
                module__data_helpers_1.DataHelpers.Collections.ForEach(value, function (value, prop) {
                    const urlParamVal = self.GetURLParameter(url, prop);
                    if (value === '*') {
                        conditionsMet.or = urlParamVal !== null;
                    }
                    else {
                        conditionsMet.or = urlParamVal === value;
                    }
                    if (conditionsMet.or) {
                        conditionsSatisfied = true;
                        return false;
                    }
                }, this);
                if (conditionsSatisfied) {
                    return false;
                }
            }, this);
        }
        if (typeof (externalParams.and) !== "undefined" && module__data_helpers_1.DataHelpers.Types.IsArray(externalParams.and)) {
            module__data_helpers_1.DataHelpers.Collections.ForEach(externalParams.and, function (value, prop) {
                let conditionsFailed = false;
                module__data_helpers_1.DataHelpers.Collections.ForEach(value, function (value, prop) {
                    const urlParamVal = self.GetURLParameter(url, prop);
                    if (value === '*') {
                        if (urlParamVal === null) {
                            conditionsMet.and = false;
                            conditionsFailed = true;
                            return false;
                        }
                    }
                    else {
                        if (urlParamVal !== value) {
                            conditionsMet.and = false;
                            conditionsFailed = true;
                            return false;
                        }
                    }
                }, this);
                if (conditionsFailed) {
                    return false;
                }
            }, this);
        }
        return conditionsMet.or && conditionsMet.and;
    }
}
exports.URLHelpers = URLHelpers;
//# sourceMappingURL=module__url_helpers.js.map