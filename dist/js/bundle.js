(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
/* axios v0.19.0-beta.1 | (c) 2018 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new i(e),n=s(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(2),s=n(3),i=n(5),a=n(22),u=n(11),c=r(u);c.Axios=i,c.create=function(e){return r(a(c.defaults,e))},c.Cancel=n(23),c.CancelToken=n(24),c.isCancel=n(10),c.all=function(e){return Promise.all(e)},c.spread=n(25),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){return"[object Array]"===j.call(e)}function o(e){return"[object ArrayBuffer]"===j.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function a(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===j.call(e)}function d(e){return"[object File]"===j.call(e)}function l(e){return"[object Blob]"===j.call(e)}function h(e){return"[object Function]"===j.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function x(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function w(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=w(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=b(t[n],e):"object"==typeof e?t[n]=b({},e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function E(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=S(t,n):e[r]=t}),e}var S=n(3),R=n(4),j=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:R,isFormData:s,isArrayBufferView:i,isString:a,isNumber:u,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:x,forEach:v,merge:w,deepMerge:b,extend:E,trim:g}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(2),s=n(6),i=n(7),a=n(8),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method=e.method?e.method.toLowerCase():"get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),s=i.join("&")}return s&&(e+=(e.indexOf("?")===-1?"?":"&")+s),e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),s=n(9),i=n(10),a=n(11),u=n(20),c=n(21);e.exports=function(e){r(e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||a.adapter;return t(e).then(function(t){return r(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!s.isUndefined(e)&&s.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)?e=n(13):"undefined"!=typeof XMLHttpRequest&&(e=n(13)),e}var s=n(2),i=n(12),a={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return i(t,"Accept"),i(t,"Content-Type"),s.isFormData(e)||s.isArrayBuffer(e)||s.isBuffer(e)||s.isStream(e)||s.isFile(e)||s.isBlob(e)?e:s.isArrayBufferView(e)?e.buffer:s.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):s.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},s.forEach(["delete","get","head"],function(e){u.headers[e]={}}),s.forEach(["post","put","patch"],function(e){u.headers[e]=s.merge(a)}),e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(14),s=n(6),i=n(17),a=n(18),u=n(15);e.exports=function(e){return new Promise(function(t,c){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var l=e.auth.username||"",h=e.auth.password||"";p.Authorization="Basic "+btoa(l+":"+h)}if(d.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?i(d.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?d.response:d.responseText,s={data:r,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};o(t,c,s),d=null}},d.onabort=function(){d&&(c(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){c(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){c(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var m=n(19),y=(e.withCredentials||a(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;y&&(p[e.xsrfHeaderName]=y)}if("setRequestHeader"in d&&r.forEach(p,function(e,t){"undefined"==typeof f&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),c(e),d=null)}),void 0===f&&(f=null),d.send(f)})}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";var r=n(16);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?i[t]=(i[t]?i[t]:[]).concat([n]):i[t]=i[t]?i[t]+", "+n:n}}),i):i}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),i===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){t=t||{};var n={};return r.forEach(["url","method","params","data"],function(e){"undefined"!=typeof t[e]&&(n[e]=t[e])}),r.forEach(["headers","auth","proxy"],function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):"undefined"!=typeof t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):"undefined"!=typeof e[o]&&(n[o]=e[o])}),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(r){"undefined"!=typeof t[r]?n[r]=t[r]:"undefined"!=typeof e[r]&&(n[r]=e[r])}),n}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});

}).call(this,require('_process'))
},{"_process":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = {
    production: false,
    ver: '001',
    requiredExternalParams: {
        'or': [
            { 'from': '*', 'utm_source': '*', 'gclid': '*' },
            { 'utm_medium': 'TestSource' }
        ],
        'and': [
            { 'test': 'test' }
        ]
    },
    api: {
        clientId: '',
        vid: '',
        urls: {
            base: "https://yoursite.com",
            toDoList: 'https://jsonplaceholder.typicode.com/todos/1',
        },
        config: {
            mainDomain: 'test.com',
            ajax: {
                active: false,
                timeout: 3000
            },
            ws: {
                active: true,
                timeout: false
            }
        },
        data: {}
    },
};

},{}],4:[function(require,module,exports){
(function (global){
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
            plugin_name.Env = module__data_helpers_1.DataHelpers.Collections.Extend(environment_example_1.Environment, settings.env);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./config/environment.example":3,"./modules/module__data_helpers":9,"./partials/partial__api_requests":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionsModule {
    static ForEach(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    const callbackReturn = callback.call(scope, collection[prop], prop, collection);
                    if (callbackReturn === false) {
                        break;
                    }
                }
            }
        }
        else {
            for (let i = 0, len = collection.length; i < len; i++) {
                const callbackReturn = callback.call(scope, collection[i], i, collection);
                if (callbackReturn === false) {
                    break;
                }
            }
        }
    }
    ;
    static Extend(defaults, options) {
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
}
exports.CollectionsModule = CollectionsModule;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module__data_helpers_1 = require("../module__data_helpers");
class DOMModule {
    static GetClosest(elem, selector) {
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
    static CreateDOMObject(options = {}, tag = 'div') {
        let element = null;
        switch (tag) {
            case 'img':
                const defaults = {
                    attributes: {
                        src: '',
                        alt: '',
                    }
                };
                const settings = module__data_helpers_1.DataHelpers.Collections.Extend(defaults, options || {});
                element = document.createElement(tag);
                module__data_helpers_1.DataHelpers.Collections.ForEach(settings.attributes, function (value, prop) {
                    element.setAttribute(prop, value);
                }, this);
                break;
        }
        return element;
    }
    ;
}
exports.DOMModule = DOMModule;

},{"../module__data_helpers":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
const types_1 = require("./types");
class FormattersModule {
    static PadLeftNum(number, padCount = 1) {
        const _this = this;
        if (!types_1.TypeModule.IsNumber(number))
            return number;
        const numberLength = types_1.TypeModule.NumberLength(number);
        if (numberLength < padCount) {
            const padCountDiff = padCount - numberLength;
            return "0".repeat(padCountDiff) + number;
        }
        return number;
    }
    ;
    static GetDataOptions(options) {
        return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
    }
    ;
    static ObjectToString(obj, prefix = null) {
        const _this = this;
        const formattedString = [];
        collections_1.CollectionsModule.ForEach(obj, function (value, prop) {
            const innPrefix = prefix ? prefix + "[" + prop + "]" : prop, innValue = value;
            const formattedValue = (innValue !== null && types_1.TypeModule.IsObject(innValue)) ?
                _this.ObjectToString(innValue, innPrefix) :
                encodeURIComponent(innPrefix) + "=" + encodeURIComponent(innValue);
            formattedString.push(formattedValue);
        }, _this);
        return formattedString.join("&");
    }
    ;
    static HashString(string) {
        let hash = 0;
        if (string.length === 0)
            return hash;
        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
    ;
    static EscapeRegExp(regExp) {
        return regExp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    ;
}
exports.FormattersModule = FormattersModule;

},{"./collections":5,"./types":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeModule {
    static IsInteger(input) {
        return parseInt(input) === input;
    }
    ;
    static IsFloat(input) {
        return parseFloat(input) === input;
    }
    ;
    static IsNumber(input) {
        return this.IsInteger(input) || this.IsFloat(input);
    }
    ;
    static NumberLength(number) {
        return Math.ceil(Math.log10(number + 1));
    }
    ;
    static IsArray(item) {
        return (item && Array.isArray(item));
    }
    ;
    static IsObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    ;
    static IsElement(item) {
        return item instanceof Element || item instanceof HTMLDocument;
    }
    ;
}
exports.TypeModule = TypeModule;

},{}],9:[function(require,module,exports){
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

},{"./data/collections":5,"./data/dom":6,"./data/formatters":7,"./data/types":8}],10:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Axios = __importStar(require("./../../../libs/axios/axios.min.js"));
const environment_example_1 = require("../config/environment.example");
class ApiRequests {
    constructor(pluginName = '') {
        this.pluginName = pluginName;
    }
    ;
    sendRequest() {
        Axios.get(environment_example_1.Environment.api.urls.toDoList, {
            params: {
                ID: 12345
            }
        });
    }
    ;
    asyncSendRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield Axios.get('https://jsonplaceholder.typicode.com/todos/1');
                console.log(response);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    ;
    promiseSendRequest(onSuccess, onError, onFinished) {
        Axios.get(environment_example_1.Environment.api.urls.toDoList, {
            params: {
                clientId: environment_example_1.Environment.api.clientId,
                vid: environment_example_1.Environment.api.vid
            }
        }).then(function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                onSuccess(response);
            }
            else {
                onError(response);
            }
        }).catch(function (error) {
            console.log(error);
            onError(error);
        }).then(function () {
            onFinished();
        });
    }
    ;
    GetResponse(onSuccess = function () {
    }, onError = function () {
    }, onFinished = function () {
    }) {
        return this.promiseSendRequest(onSuccess, onError, onFinished);
    }
    ;
}
exports.ApiRequests = ApiRequests;

},{"../config/environment.example":3,"./../../../libs/axios/axios.min.js":2}]},{},[4]);
