"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TpLinkServiceStream_1 = require("./TpLinkServiceStream");
describe('The TPLink ServiceStream', () => {
    it('Should find stuff', () => {
        let stream = new TpLinkServiceStream_1.TpLinkServiceStream();
        stream.on('DeviceDiscovered', (bulb) => {
            console.log(JSON.stringify(bulb));
        });
        stream.connect();
    });
});
