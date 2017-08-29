import * as Wemo from 'wemo-client';
import { WemoDevice } from "./WemoDevice";
import { DeviceFactory } from "../DeviceFactory";

export class WemoDeviceFactory extends DeviceFactory<WemoDevice> {
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