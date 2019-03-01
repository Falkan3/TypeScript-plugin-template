/**
 *
 * PluginName v0.0.1
 * Description
 *
 * Template by Adam Kocić (Falkan3).
 * https://github.com/Falkan3
 *
 * ------------------------------------------
 *
 * JS plugin boilerplate, by Chris Ferdinandi.
 * http://gomakethings.com
 *
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 *
 */

// libs

// env
import {Environment} from './config/environment.example';
// standard modules
import {DateTimeHelpers} from "./modules/module__datetime_helpers";
import {DataHelpers} from "./modules/module__data_helpers";
import {URLHelpers} from "./modules/module__url_helpers";
// custom modules

// partials
import {ApiRequests} from "./partials/partial__api_requests";


declare const global: any;
declare const define: any;
declare const exports: any;
declare const module: any;

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        // root.plugin_name = factory(root);
    }

    root.plugin_name = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    const plugin_name = <any>{}; // Object for public APIs
    const supports = !!document.querySelector && !!root.addEventListener; // Feature test
    let settings, eventTimeout;
    const pluginName = 'Plugin name',
        pluginPrefix = 'plugin_name',
        pluginPrefixLowercase = pluginPrefix.toLowerCase();

    // Default settings
    const defaults = {
        someVar: 123,
        initClass: 'js-' + pluginPrefixLowercase,

        env: null, // custom env object

        /*************
         * Callbacks
         *************/

        callbackOnInit: function() {
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

    // Make env publicly available
    plugin_name.Env = Environment;

    //
    // Modules - Helpers
    //

    //
    // Partials
    //
    const apiRequests = new ApiRequests(pluginName);

    //
    // Methods
    //

    // @todo Do something...

    /**
     * Handle events
     * @private
     */
    const eventHandler = function (event) {
        const toggle = event.target;
        const closest = DataHelpers.DOM.GetClosest(toggle, '[data-some-selector]');
        if (closest) {
            // run methods
        }
    };

    /**
     * Destroy the current initialization.
     * @public
     */
    plugin_name.destroy = function () {

        // If plugin isn't already initialized, stop
        if (!settings) return;

        // On Destroy Before callback
        if (typeof settings.callbackOnDestroyBefore === 'function') {
            settings.callbackOnDestroyBefore.call(this);
        }

        // Remove init class for conditional CSS
        document.documentElement.classList.remove(settings.initClass);

        // @todo Undo any other init functions...

        // Remove event listeners
        document.removeEventListener('click', eventHandler, false);

        // On Destroy After callback
        if (typeof settings.callbackOnDestroyAfter === 'function') {
            settings.callbackOnDestroyAfter.call(this);
        }

        // Reset variables
        settings = null;
        eventTimeout = null;
    };

    /**
     * On window scroll and resize, only run events at a rate of 15fps for better performance
     * @private
     * @param  {Function} eventTimeout Timeout function
     * @param  {Object} settings
     */
    const eventThrottler = function () {
        if (!eventTimeout) {
            eventTimeout = setTimeout(function () {
                eventTimeout = null;
                // actualMethod(settings);
            }, 66);
        }
    };

    /**
     * Initialize Environmental configuration - apply changes.
     * @private
     */
    const initEnv = function () {
        // check for custom env in settings
        if (settings.env && DataHelpers.Types.IsObject(settings.env)) {
            DataHelpers.Collections.Extend(Environment, settings.env);
            DataHelpers.General.Log('[Success] Applied custom env settings.', 'success');
        }

        // supported
        // websocket
        Environment.api.config.ws.active = Environment.api.config.ws.active && !!window['WebSocket'];
    };

    /**
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    plugin_name.init = function (options) {
        // feature test
        if (!supports) return;

        // Destroy any existing initializations
        plugin_name.destroy();

        // Merge user options with defaults
        settings = DataHelpers.Collections.Extend(defaults, options || {});
        // Make settings public
        plugin_name.settings = settings;

        // Init Environmental config
        initEnv();

        // Add class to HTML element to activate conditional CSS
        document.documentElement.classList.add(settings.initClass);

        // @todo Do something...
        DataHelpers.General.Log('error message', 'error');
        DataHelpers.General.Log('warning message', 'warning');
        DataHelpers.General.Log('info message', 'info');
        DataHelpers.General.Log('default message', 'default');

        // Listen for events
        document.addEventListener('click', eventHandler, false);

        // On Init callback
        plugin_name.callbackCall('Init');
    };

    /**
     * Call callback by name
     * @public
     * @param {String} callbackName callback's name
     */
    plugin_name.callbackCall = function (callbackName: string) {
        const callback = settings[`callbackOn${callbackName}`];
        const callbackArray = settings[`callbackOn${callbackName}Array`];
        if (typeof callback === 'function') {
            callback.call(this);
        }
        if(DataHelpers.Types.IsArray(callbackArray)) {
            DataHelpers.Collections.ForEach(callbackArray, function(value, prop) {
                if (typeof callbackArray[prop] === 'function') {
                    callbackArray[prop].call(this);
                }
            }, this);
        }
    };

    //
    // Public APIs
    //

    return plugin_name;

});