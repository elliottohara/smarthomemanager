"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class ServiceClient extends events_1.EventEmitter {
    constructor() {
        super();
        this.stateChangeEvent = 'StateChange';
    }
    // TODO: should this return a promise?
    OnStateChange(callback) {
        this.addListener(this.stateChangeEvent, callback);
    }
}
exports.ServiceClient = ServiceClient;
