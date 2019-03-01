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
    sendRequest() {
        Axios.get(environment_example_1.Environment.api.urls.toDoList, {
            params: {
                ID: 12345
            }
        });
    }
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
    GetResponse(onSuccess = function () {
    }, onError = function () {
    }, onFinished = function () {
    }) {
        return this.promiseSendRequest(onSuccess, onError, onFinished);
    }
}
exports.ApiRequests = ApiRequests;
//# sourceMappingURL=partial__api_requests.js.map