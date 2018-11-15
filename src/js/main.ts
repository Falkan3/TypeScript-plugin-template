/**
 *
 * TWD_SIPR v0.0.1
 * TrafficWatchdog Source Input Processor/Relay
 *
 * TrafficWatchdog source input plugin, by Adam Kocić (Falkan3).
 * https://trafficwatchdog.com
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

// standard modules
import { Helpers } from "../../modules/helpers";
// custom modules


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
        // root.TWD_SIPR = factory(root);
    }

    root.TWD_SIPR = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    const TWD_SIPR = <any>{}; // Object for public APIs
    const supports = !!document.querySelector && !!root.addEventListener; // Feature test
    let settings, eventTimeout;
    const pluginName = 'TrafficWatchdog Source Input Processor/Relay',
        pluginPrefix = 'TWD_SIPR',
        pluginPrefixLowercase = pluginPrefix.toLowerCase();

    // Default settings
    const defaults = {
        someVar: 123,
        initClass: 'js-' + pluginPrefixLowercase,
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

    //
    // Helpers
    //
    const helpers = new Helpers(pluginName);

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
        const closest = helpers.GetClosest(toggle, '[data-some-selector]');
        if (closest) {
            // run methods
        }
    };

    /**
     * Destroy the current initialization.
     * @public
     */
    TWD_SIPR.destroy = function () {

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

        // Reset variables
        settings = null;
        eventTimeout = null;

        // On Destroy After callback
        if (typeof settings.callbackOnDestroyAfter === 'function') {
            settings.callbackOnDestroyAfter.call(this);
        }
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
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    TWD_SIPR.init = function (options) {
        // feature test
        if (!supports) return;

        // Destroy any existing initializations
        TWD_SIPR.destroy();

        // Merge user options with defaults
        settings = helpers.Extend(defaults, options || {});

        // Add class to HTML element to activate conditional CSS
        document.documentElement.classList.add(settings.initClass);

        // @todo Do something...
        helpers.Log('error message', 'error');
        helpers.Log('warning message', 'warning');
        helpers.Log('info message', 'info');
        helpers.Log('default message', 'default');

        // Listen for events
        document.addEventListener('click', eventHandler, false);

        // On Init callback
        TWD_SIPR.callbackCall('Init');
    };

    /**
     * Call callback by name
     * @public
     * @param {String} callbackName callback's name
     */
    TWD_SIPR.callbackCall = function (callbackName: string) {
        const callback = settings[`callbackOn${callbackName}`];
        const callbackArray = settings[`callbackOn${callbackName}Array`];
        if (typeof callback === 'function') {
            callback.call(this);
        }
        if(helpers.IsArray(callbackArray)) {
            helpers.ForEach(callbackArray, function(value, prop) {
                if (typeof callbackArray[prop] === 'function') {
                    callbackArray[prop].call(this);
                }
            }, this);
        }
    };

    //
    // Public APIs
    //

    return TWD_SIPR;

});