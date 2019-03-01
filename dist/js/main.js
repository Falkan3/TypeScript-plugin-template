"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_example_1 = require("./config/environment.example");
const module__data_helpers_1 = require("./modules/module__data_helpers");
const partial__api_requests_1 = require("./partials/partial__api_requests");
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    }
    else if (typeof exports === 'object') {
        module.exports = factory(root);
    }
    else {
    }
    root.plugin_name = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';
    const plugin_name = {};
    const supports = !!document.querySelector && !!root.addEventListener;
    let settings, eventTimeout;
    const pluginName = 'Plugin name', pluginPrefix = 'plugin_name', pluginPrefixLowercase = pluginPrefix.toLowerCase();
    const defaults = {
        someVar: 123,
        initClass: 'js-' + pluginPrefixLowercase,
        env: null,
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
    plugin_name.Env = environment_example_1.Environment;
    const apiRequests = new partial__api_requests_1.ApiRequests(pluginName);
    const eventHandler = function (event) {
        const toggle = event.target;
        const closest = module__data_helpers_1.DataHelpers.DOM.GetClosest(toggle, '[data-some-selector]');
        if (closest) {
        }
    };
    plugin_name.destroy = function () {
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
    const initEnv = function () {
        if (settings.env && module__data_helpers_1.DataHelpers.Types.IsObject(settings.env)) {
            module__data_helpers_1.DataHelpers.Collections.Extend(environment_example_1.Environment, settings.env);
            module__data_helpers_1.DataHelpers.General.Log('[Success] Applied custom env settings.', 'success');
        }
        environment_example_1.Environment.api.config.ws.active = environment_example_1.Environment.api.config.ws.active && !!window['WebSocket'];
    };
    plugin_name.init = function (options) {
        if (!supports)
            return;
        plugin_name.destroy();
        settings = module__data_helpers_1.DataHelpers.Collections.Extend(defaults, options || {});
        plugin_name.settings = settings;
        initEnv();
        document.documentElement.classList.add(settings.initClass);
        module__data_helpers_1.DataHelpers.General.Log('error message', 'error');
        module__data_helpers_1.DataHelpers.General.Log('warning message', 'warning');
        module__data_helpers_1.DataHelpers.General.Log('info message', 'info');
        module__data_helpers_1.DataHelpers.General.Log('default message', 'default');
        document.addEventListener('click', eventHandler, false);
        plugin_name.callbackCall('Init');
    };
    plugin_name.callbackCall = function (callbackName) {
        const callback = settings[`callbackOn${callbackName}`];
        const callbackArray = settings[`callbackOn${callbackName}Array`];
        if (typeof callback === 'function') {
            callback.call(this);
        }
        if (module__data_helpers_1.DataHelpers.Types.IsArray(callbackArray)) {
            module__data_helpers_1.DataHelpers.Collections.ForEach(callbackArray, function (value, prop) {
                if (typeof callbackArray[prop] === 'function') {
                    callbackArray[prop].call(this);
                }
            }, this);
        }
    };
    return plugin_name;
});
//# sourceMappingURL=main.js.map