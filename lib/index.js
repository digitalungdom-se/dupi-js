"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const DIGITALUNGDOMURL = "https://digitalungdom.se/openapi/";
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
    callAPI(path, method, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method,
                uri: DIGITALUNGDOMURL + path,
                headers: { "X-API-Key": this.apiKey },
                resolveWithFullResponse: true,
                json: true,
                body: info,
            };
            return yield request_promise_1.default(requestOptions);
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.callAPI("ping", "GET");
                return true;
            }
            catch (e) {
                throw new RequestError("errorAuthenticating", 401);
            }
        });
    }
    getUser(userSecretID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = { userSecretID };
                const res = yield this.callAPI("get/user", "GET", info);
                return res.body.user;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.default = Dupi;
//# sourceMappingURL=index.js.map