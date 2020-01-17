declare class Dupi<User> {
    private apiKey;
    constructor(apiKey: string);
    private callAPI;
    ping(): Promise<boolean>;
    getUser(userSecretID: string): Promise<User | boolean>;
}
export default Dupi;
