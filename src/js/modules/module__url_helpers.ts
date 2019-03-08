/*
 * URL Helpers - module
 *
 * URL formatting functions
 */

// env
import {Environment} from '../config/environment.example';
// standard modules
import {DataHelpers} from "./module__data_helpers";

export class URLHelpers {
    constructor() {

    }

    /*
     * General purpose
     */

    /**
     * Get parameters from URL
     * @public
     * @static
     * @param {String} url - url to get parameters from
     * @return {JSON} JSON object with key -> value structure ({utm_source: 'utm_source_value'})
     */
    public static GetURLParameters(url) {
        if (typeof (url) === "undefined") {
            url = window.location.href;
        }

        var b = {},
            c = url.indexOf("?");
        if (-1 == c) return b;
        for (let d = url.substring(c + 1), e = d.split("&"), f = 0; f < e.length; f++) {
            const g = e[f].split("=");
            b[g[0]] = g[1]
        }
        return b
    }

    /**
     * Get parameter from URL
     * @public
     * @static
     * @param {String} url - url to get parameter from
     * @param {String} name - name of the parameter to retrieve the value of
     * @return {String} parameter value (null if empty)
     */
    public static GetURLParameter(url: string = location.search, name: string) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    /**
     * Append parameters to an URL
     * @public
     * @static
     * @param {String} url - url
     * @param {Object} params - JSON with new parameters
     * @return {String} parameter value (null if empty)
     */
    public static AppendURLParameters(url: string = window.location.href, params: object) {
        if (window.URLSearchParams) {
            const query = new URLSearchParams(window.location.search);
            DataHelpers.Collections.ForEach(params, function (_value, _prop) {
                // check if the parameter already exists
                if (!!query.get(_prop)) {
                    query.set(_prop, _value);
                } else {
                    query.append(_prop, _value);
                }
            }, this);
            return this.GetURLWithoutQuery(url) + '?' + query.toString();
        } else {
            let query = document.location.search;

            DataHelpers.Collections.ForEach(params, function (_value, _prop) {
                const key = encodeURIComponent(_prop);
                const val = encodeURIComponent(_value);

                const key_val = key + "=" + val;
                const regex = new RegExp("(&|\\?)" + key + "=[^\&]*");

                query = query.replace(regex, "$1" + key_val);

                if (!RegExp.$1) {
                    query += (query.length > 0 ? '&' : '?') + key_val;
                }
            }, this);

            return this.GetURLWithoutQuery(url) + query;
        }
    }

    /**
     * Remove query parameters from an URL
     * @public
     * @static
     * @param {String} url - url
     * @return {String} raw url without query
     */
    public static GetURLWithoutQuery(url: string = window.location.href) {
        return url.split(/[?#]/)[0];
        // return [location.protocol, '//', location.host, location.pathname].join('');
        // return url.split('?')[0];
    }

    /**
     * Remove query parameters from an URL
     * @public
     * @static
     * @param {String} referrer - url to be checked
     * @param {String} searchedDomain - domain to be matched (for example 'reddit.com')
     * @return {Boolean} returns true if the referrer matches the given domain, otherwise false will be returned
     */
    public static MatchReferrer(referrer: string = document.referrer, searchedDomain: string) {
        searchedDomain = DataHelpers.Formatters.EscapeRegExp(searchedDomain);
        const regExp = RegExp(`^https?:\/\/([^\/]+\.)?${encodeURIComponent(searchedDomain)}(\/|$)`, 'i');
        return referrer.match(regExp); // referrer.match(/^https?:\/\/([^\/]+\.)?reddit\.com(\/|$)/i);
    }

    /* ---------- */

    /*
     * Plugin specific
     */

    /**
     * Check if the given URL has source parameters, be it affiliation, google ads etc.
     * @public
     * @static
     * @param {String} url - url
     * @return {Boolean} returns true if the URL has source parameters, otherwise false
     */
    public static HasSource(url: string = window.location.href) {
        const self = this;
        const externalParams = Environment.requiredExternalParams;
        let conditionsMet = {or: true, and: true};
        // only one condition needs to be met
        if (typeof (externalParams.or) !== "undefined" && DataHelpers.Types.IsArray(externalParams.or)) {
            DataHelpers.Collections.ForEach(externalParams.or, function (value, prop) {
                let conditionsSatisfied = false;
                DataHelpers.Collections.ForEach(value, function (value, prop) {
                    const urlParamVal = self.GetURLParameter(url, prop);
                    // * means any param value
                    if (value === '*') {
                        conditionsMet.or = urlParamVal !== null;
                    } else {
                        conditionsMet.or = urlParamVal === value;
                    }

                    if (conditionsMet.or) {
                        conditionsSatisfied = true;
                        return false;
                    }
                }, this);

                // if one condition was satisfied in the 'or' array, stop looking further.
                if (conditionsSatisfied) {
                    return false;
                }
            }, this);
        }
        // all conditions need to be met
        if (typeof (externalParams.and) !== "undefined" && DataHelpers.Types.IsArray(externalParams.and)) {
            DataHelpers.Collections.ForEach(externalParams.and, function (value, prop) {
                let conditionsFailed = false;
                DataHelpers.Collections.ForEach(value, function (value, prop) {
                    const urlParamVal = self.GetURLParameter(url, prop);
                    // * means any param value
                    if (value === '*') {
                        if (urlParamVal === null) {
                            conditionsMet.and = false;
                            conditionsFailed = true;
                            return false;
                        }
                    } else {
                        if (urlParamVal !== value) {
                            conditionsMet.and = false;
                            conditionsFailed = true;
                            return false;
                        }
                    }
                }, this);

                // if one condition failed in the 'and' array, return false altogether.
                if (conditionsFailed) {
                    return false;
                }
            }, this);
        }

        return conditionsMet.or && conditionsMet.and;
    }
}