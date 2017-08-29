"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TpLinkServiceClient_1 = require("./TpLinkServiceClient");
const Bulb = require("tplink-lightbulb");
describe('The TPLink Service Clent', () => {
    it('Should turn off a light', () => {
        const bulbIp = '192.168.1.182';
        const tpLinkBulb = new Bulb(bulbIp);
        const client = new TpLinkServiceClient_1.TpLinkServiceClient(tpLinkBulb);
        client.setState(1);
    });
});
