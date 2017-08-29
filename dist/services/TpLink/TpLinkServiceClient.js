"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceClient_1 = require("../../services/ServiceClient");
const POLL_INTERVAL = 500;
class TpLinkServiceClient extends ServiceClient_1.ServiceClient {
    constructor(tpLinkBulb, info) {
        super();
        this.tpLinkBulb = tpLinkBulb;
        this.info = info;
        // we also need to set up polling since TpLink doesn't emit events
        this.watch();
    }
    setState(state) {
        this.tpLinkBulb.set(state);
    }
    watch() {
        setInterval(() => {
            this.setInfo();
        }, POLL_INTERVAL);
    }
    setInfo() {
        this.tpLinkBulb.info().then((info) => {
            if (JSON.stringify(this.state) !== JSON.stringify(info.light_state)) {
                this.emit(this.stateChangeEvent, info.light_state);
                this.state = info.light_state;
            }
        });
    }
}
exports.TpLinkServiceClient = TpLinkServiceClient;
