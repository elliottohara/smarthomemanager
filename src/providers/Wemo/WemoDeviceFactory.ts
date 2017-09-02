import * as Wemo from 'wemo-client';
import { WemoDevice } from "./WemoDevice";
import { DeviceFactory } from "../DeviceFactory";

// TODO: we need to add support for various kids of smart devices
// maybe each factory can filter by device type and create the proper instance
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