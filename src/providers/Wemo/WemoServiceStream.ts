import * as Wemo from 'wemo-client';
import { Discoverer } from "../Discoverer";
import { WemoLightBulb } from "./WemoLightBulb";

export class WemoDiscoverer extends Discoverer<WemoLightBulb> {
    constructor() {
        super();
    }
    connect(): void {
        let wemoClient = new Wemo();
        wemoClient.discover( (err, deviceInfo) => {
            let client = new WemoLightBulb(wemoClient.client(deviceInfo));
            this.addClient(client);
        });
    }
}