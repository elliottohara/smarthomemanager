import { ServiceStream } from '../ServiceStream';
import { ServiceClient } from '../ServiceClient';
import * as Wemo from 'wemo-client';
import { WemoServiceClient } from "./WemoServiceClient";

export class WemoServiceStream extends ServiceStream<WemoServiceClient> {
    constructor() {
        super();
    }
    connect(): void {
        let wemoClient = new Wemo();
        wemoClient.discover( (err, deviceInfo) => {
            let client = new WemoServiceClient(wemoClient.client(deviceInfo));
            this.addClient(client);
        });
    }
}