"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
//const DIGITALUNGDOMURL = 'https://digitalungdom.se/openapi/';
const DIGITALUNGDOMURL = 'http://localhost:8080/openapi/';
class RequestError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "RequestError";
        this.statusCode = statusCode;
    }
}
class Dupi {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API key required");
        }
        this.apiKey = apiKey;
    }
    async callAPI(path, method, info) {
        var requestOptions = {
            method: method,
            uri: DIGITALUNGDOMURL + path,
            headers: { 'x-api-key': this.apiKey },
            resolveWithFullResponse: true,
            json: true,
            body: info
        };
        return await request_promise_1.default(requestOptions);
    }
    async ping() {
        try {
            await this.callAPI('ping', 'GET');
            return true;
        }
        catch (e) {
            throw new RequestError("errorAuthenticating", 401);
        }
    }
    async getUser(userSecretID) {
        try {
            const info = { userSecretID };
            const res = await this.callAPI('get/user', 'GET', info);
            return res.body.user;
        }
        catch (e) {
            return false;
        }
    }
}
(async function () {
    const dupi = new Dupi('7f3d57daafab38ca095e435f072f40b03bb8fb1e9b10658e41ac6fee430071ab');
    await dupi.ping();
    const user = await dupi.getUser("testid");
    console.log(user);
})();
exports.default = Dupi;
//# sourceMappingURL=index.js.map