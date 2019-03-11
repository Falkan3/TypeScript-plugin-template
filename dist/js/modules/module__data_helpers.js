"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _TypesModule = __importStar(require("./data/types"));
const _CollectionsModule = __importStar(require("./data/collections"));
const _FormattersModule = __importStar(require("./data/formatters"));
const _DOMMOdule = __importStar(require("./data/dom"));
var DataHelpers;
(function (DataHelpers) {
    DataHelpers.Types = _TypesModule.TypeModule;
    DataHelpers.Collections = _CollectionsModule.CollectionsModule;
    DataHelpers.Formatters = _FormattersModule.FormattersModule;
    DataHelpers.DOM = _DOMMOdule.DOMModule;
    class General {
        constructor(pluginName = '') {
            this.pluginName = pluginName;
        }
        ;
        static CookieSet(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
        ;
        static CookieGet(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0)
                    return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        ;
        static CookieErase(name, cPath, cDomain) {
            document.cookie = encodeURIComponent(name) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (cDomain ? "; domain=" + cDomain : "") +
                (cPath ? "; path=" + cPath : "");
        }
        ;
        static Log(msg, msgType, pluginName = null) {
            let styling = '';
            console.log('%c>>>>>>>>>>>>>>>>>>', 'color: #ddd;');
            if (pluginName) {
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
        }
        ;
    }
    DataHelpers.General = General;
})(DataHelpers = exports.DataHelpers || (exports.DataHelpers = {}));
//# sourceMappingURL=module__data_helpers.js.map