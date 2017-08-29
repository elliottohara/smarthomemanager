"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceStream_1 = require("../ServiceStream");
const Wemo = require("wemo-client");
const WemoServiceClient_1 = require("./WemoServiceClient");
class WemoServiceStream extends ServiceStream_1.ServiceStream {
    constructor() {
        super();
    }
    connect() {
        let wemoClient = new Wemo();
        wemoClient.discover((err, deviceInfo) => {
            let client = new WemoServiceClient_1.WemoServiceClient(wemoClient.client(deviceInfo));
            this.addClient(client);
        });
    }
}
exports.WemoServiceStream = WemoServiceStream;
