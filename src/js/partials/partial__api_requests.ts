/*
 * ProtectCheck - partial
 *
 * Check for the number of visits from the current machine / IP
 * Requires TWD application
 */

// libs
import * as Axios from './../../../libs/axios/axios.min.js';
// env
import {Environment} from '../config/environment.example';
// standard modules
import {URLHelpers} from "../modules/module__url_helpers";

export class ApiRequests {
    pluginName;

    constructor(pluginName :string = '') {
        this.pluginName = pluginName;
    };

    /**
     * Sends request to the API
     * @private
     */
    private sendRequest() {
        Axios.get(Environment.api.urls.toDoList, {
            params: {
                ID: 12345
            }
        });
    };

    /**
     * Sends request to the API. Async.
     * @private
     */
    private async asyncSendRequest() {
        try {
            const response = await Axios.get('https://jsonplaceholder.typicode.com/todos/1');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Sends request to the API
     * @private
     * @param {Function} onSuccess - success callback function
     * @param {Function} onError - error callback function
     * @param {Function} onFinished - finished callback function. Called every time.
     */
    private promiseSendRequest(onSuccess: Function, onError: Function, onFinished: Function) {
        Axios.get(Environment.api.urls.toDoList, {
            params: {
                clientId: Environment.api.clientId,
                vid: Environment.api.vid
            }
        }).then(function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                onSuccess(response);
            } else {
                onError(response);
            }
        }).catch(function (error) {
            console.log(error);
            onError(error);
        }).then(function () {
            // always executed
            onFinished();
        })

        // examples

        /*
        Axios.get('https://jsonplaceholder.typicode.com/todos/1', {
            params: {
                ID: 12345
            }
        }).then(response => onSuccess(response)).catch(error => onError(error)).then(response => onFinished(response));
        */

        /*
        Axios.get('https://jsonplaceholder.typicode.com/todos/1', {
            params: {
                ID: 12345
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
        */
    };

    /**
     * Sends request to the API
     * @public
     * @param {Function} onSuccess - success callback function
     * @param {Function} onError - error callback function
     * @param {Function} onFinished - finished callback function. Called every time.
     */
    public GetResponse(onSuccess: Function = function () {
    }, onError: Function = function () {
    }, onFinished: Function = function () {
    }) {
        return this.promiseSendRequest(onSuccess, onError, onFinished);
    };
}