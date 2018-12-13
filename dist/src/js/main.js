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
    const TWD_SIPR = {};
    const supports = !!document.querySelector && !!root.addEventListener;
    let settings, eventTimeout;
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
    return TWD_SIPR;
});
//# sourceMappingURL=main.js.map