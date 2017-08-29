"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class ServiceStream extends events_1.EventEmitter {
    constructor() {
        super();
        this.deviceDiscovered = 'DeviceDiscovered';
        this._clients = [];
    }
    onDeviceDiscovered(callback) {
        this.addListener(this.deviceDiscovered, callback);
    }
    get clients() {
        return this._clients;
    }
    addClient(client) {
        this.clients.push(client);
        this.emit(this.deviceDiscovered, client);
    }
}
exports.ServiceStream = ServiceStream;
