/*
 * Data Helpers - module
 *
 * General data formatting functions
 */

// declare module "DataHelpers" {}

import * as _TypesModule from "./data/types";
import * as _CollectionsModule from "./data/collections";
import * as _FormattersModule from "./data/formatters";
import * as _DOMMOdule from "./data/dom";

export module DataHelpers {
    /*
    * Types
    */
    export import Types = _TypesModule.TypeModule;

    /*
    * Collections
    */
    export import Collections = _CollectionsModule.CollectionsModule;

    /*
     * Formatters
     */
    export import Formatters = _FormattersModule.FormattersModule;

    /*
     * DOM
     */
    export import DOM = _DOMMOdule.DOMModule;

    /*
     * General
     */
    export class General {
        pluginName;

        constructor(pluginName: string = '') {
            this.pluginName = pluginName;
        };

        /*
         * Cookies
         */

        /**
         * Set cookie
         * @public
         * @static
         * @param  {String} name
         * @param  {String} value
         * @param  {number} days
         */
        public static CookieSet = function (name: string, value: string, days: number) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        };

        /**
         * Return cookie value or null
         * @public
         * @static
         * @param  {String} name
         * @returns {String|null} retrieved cookie value
         */
        public static CookieGet = function (name: string) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        };

        /**
         * Invalidate a cookie
         * @public
         * @static
         * @param  {String} name
         * @param {String} cPath
         * @param {String} cDomain
         */
        public static CookieErase = function (name: string, cPath: string, cDomain: string) {
            // document.cookie = name + '=; Max-Age=-99999999;';

            document.cookie = encodeURIComponent(name) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (cDomain ? "; domain=" + cDomain : "") +
                (cPath ? "; path=" + cPath : "");
        };

        /*
         * General helpers
         */

        /**
         * Log a styled message in the console
         * @public
         * @static
         * @param  {String} msg - message to be logged
         * @param  {String} msgType - the style of the message
         * @param  {String} pluginName - (optional) plugin name
         */
        public static Log(msg: string, msgType: string, pluginName: string = null) {
            let styling = '';
            console.log('%c>>>>>>>>>>>>>>>>>>', 'color: #ddd;');
            if(pluginName) {
                console.log('%c' + pluginName, 'font-size: 14px;');
            }
            switch (msgType) {
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
                    console.log('%c' + 'SUCCESS', styling);
                    break;
                default:
                    styling = 'color: #8f8f8f;';
                    break;
            }
            console.log('%c' + msg, styling);
            console.log('%c<<<<<<<<<<<<<<<<<<', 'color: #ddd;');
        };
    }
}