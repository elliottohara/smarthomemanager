import * as Wemo from 'wemo-client';
import { Discoverer } from "../Discoverer";
import { WemoDevice } from "./WemoDevice";

export class WemoDiscoverer extends Discoverer<WemoDevice> {
    constructor() {
        super();
    }
    connect(): void {
        let wemoClient = new Wemo();
        wemoClient.discover( (err, deviceInfo) => {
            let client = new WemoDevice(wemoClient.client(deviceInfo));
            this.addClient(client);
        });
    }
}