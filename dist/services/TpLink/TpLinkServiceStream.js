"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceStream_1 = require("../ServiceStream");
const TpLink = require("tplink-lightbulb");
const TpLinkServiceClient_1 = require("./TpLinkServiceClient");
class TpLinkServiceStream extends ServiceStream_1.ServiceStream {
    constructor() {
        super();
    }
    connect() {
        TpLink.scan().on('light', (light) => {
            let newBulb = new TpLink(light.host);
            console.log(JSON.stringify(light));
            let client = new TpLinkServiceClient_1.TpLinkServiceClient(newBulb, light);
            this.addClient(client);
        });
    }
}
exports.TpLinkServiceStream = TpLinkServiceStream;
