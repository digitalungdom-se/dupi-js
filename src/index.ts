import request from "request-promise";

const DIGITALUNGDOMURL = "https://digitalungdom.se/openapi/";
// const DIGITALUNGDOMURL = 'http://localhost:8080/openapi/';

type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

class RequestError extends Error {
    public name: string;
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "RequestError";
        this.statusCode = statusCode;
    }
}

class Dupi<User> {
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error("API key required");
        }

        this.apiKey = apiKey;
    }

    private async callAPI(path: string, method: RequestMethod, info?: object): Promise<any> {
        const requestOptions: request.OptionsWithUri = {
            method,
            uri: DIGITALUNGDOMURL + path,
            headers: { "X-API-Key": this.apiKey },
            resolveWithFullResponse: true,
            json: true,
            body: info,
        };

        return await request(requestOptions);
    }

    public async ping(): Promise<boolean> {
        try {
            await this.callAPI("ping", "GET");
            return true;
        } catch (e) {
            throw new RequestError("errorAuthenticating", 401);
        }
    }

    public async getUser(userSecretID: string): Promise<User | boolean> {
        try {
            const info = { userSecretID };
            const res = await this.callAPI("get/user", "GET", info);
            return res.body.user;
        } catch (e) {
            return false;
        }
    }
}

export default Dupi;
