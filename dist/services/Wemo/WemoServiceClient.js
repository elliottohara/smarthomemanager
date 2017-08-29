"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceClient_1 = require("../ServiceClient");
class WemoServiceClient extends ServiceClient_1.ServiceClient {
    constructor(wemoBulb) {
        super();
        this.wemoBulb = wemoBulb;
        // Wemos handle their own events, and emit a 'binaryState', let's just map it
        wemoBulb.on('binaryState', (state) => {
            this.emit(this.stateChangeEvent, state);
        });
    }
    setState(state) {
        this.wemoBulb.setBinaryState(state);
    }
}
exports.WemoServiceClient = WemoServiceClient;
