(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    constructor(pluginName = '') {
        this.pluginName = pluginName;
    }
    IsArray(item) {
        return (item && Array.isArray(item));
    }
    ;
    IsObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    ;
    ForEach(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        }
        else {
            for (let i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    }
    ;
    Extend(defaults, options) {
        const extended = {};
        this.ForEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        }, undefined);
        this.ForEach(options, function (value, prop) {
            extended[prop] = options[prop];
        }, undefined);
        return extended;
    }
    ;
    GetDataOptions(options) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    }
    ;
    GetClosest(elem, selector) {
        const firstChar = selector.charAt(0);
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (firstChar === '.') {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            }
            else if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            }
            else if (firstChar === '[') {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    return elem;
                }
            }
        }
        return false;
    }
    ;
    Log(msg, msgType) {
        let styling = '';
        console.log('%c>>>>>>>>>>>>>>>>>>', 'color: #ddd;');
        console.log('%c' + this.pluginName, 'font-size: 14px;');
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
                console.log('%c' + 'ERROR', styling);
                break;
            default:
                styling = 'color: #8f8f8f;';
                break;
        }
        console.log('%c' + msg, styling);
        console.log('%c<<<<<<<<<<<<<<<<<<', 'color: #ddd;');
    }
}
exports.Helpers = Helpers;

},{}],2:[function(require,module,exports){
(function (global){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../modules/helpers");
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    }
    else if (typeof exports === 'object') {
        module.exports = factory(root);
    }
    else {
    }
    root.TWD_SIPR = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';
    const supports = !!document.querySelector && !!root.addEventListener;
    const pluginName = 'TrafficWatchdog Source Input Processor/Relay', pluginPrefix = 'TWD_SIPR', pluginPrefixLowercase = pluginPrefix.toLowerCase();
    const defaults = {
        someVar: 123,
        initClass: 'js-' + pluginPrefixLowercase,
        callbackOnInit: function () {
            console.log('Init function callback');
        },
        callbackOnInitArray: [
            function () {
                console.log('Init function callback array 1');
            },
            function () {
                console.log('Init function callback array 2');
            },
        ],
        callbackOnDestroyBefore: function () {
        },
        callbackOnDestroyAfter: function () {
        },
    };
    const helpers = new helpers_1.Helpers(pluginName);
    const Constructor = function (options) {
        const TWD_SIPR = {};
        let settings, eventTimeout;
        const eventHandler = function (event) {
            const toggle = event.target;
            const closest = helpers.GetClosest(toggle, '[data-some-selector]');
            if (closest) {
            }
        };
        TWD_SIPR.destroy = function () {
            if (!settings)
                return;
            if (typeof settings.callbackOnDestroyBefore === 'function') {
                settings.callbackOnDestroyBefore.call(this);
            }
            document.documentElement.classList.remove(settings.initClass);
            document.removeEventListener('click', eventHandler, false);
            if (typeof settings.callbackOnDestroyAfter === 'function') {
                settings.callbackOnDestroyAfter.call(this);
            }
            settings = null;
            eventTimeout = null;
        };
        const eventThrottler = function () {
            if (!eventTimeout) {
                eventTimeout = setTimeout(function () {
                    eventTimeout = null;
                }, 66);
            }
        };
        TWD_SIPR.init = function (options) {
            if (!supports)
                return;
            TWD_SIPR.destroy();
            settings = helpers.Extend(defaults, options || {});
            document.documentElement.classList.add(settings.initClass);
            helpers.Log('error message', 'error');
            helpers.Log('warning message', 'warning');
            helpers.Log('info message', 'info');
            helpers.Log('default message', 'default');
            document.addEventListener('click', eventHandler, false);
            TWD_SIPR.callbackCall('Init');
        };
        TWD_SIPR.callbackCall = function (callbackName) {
            const callback = settings[`callbackOn${callbackName}`];
            const callbackArray = settings[`callbackOn${callbackName}Array`];
            if (typeof callback === 'function') {
                callback.call(this);
            }
            if (helpers.IsArray(callbackArray)) {
                helpers.ForEach(callbackArray, function (value, prop) {
                    if (typeof callbackArray[prop] === 'function') {
                        callbackArray[prop].call(this);
                    }
                }, this);
            }
        };
    };
    return Constructor;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../modules/helpers":1}]},{},[2]);
