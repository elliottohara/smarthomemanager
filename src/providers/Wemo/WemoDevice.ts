import * as Wemo from 'wemo-client';
import { Device } from "../Device";

export class WemoDevice extends Device {
    constructor(public vendorDevice: Wemo) {
        super();
        this.DeviceName = vendorDevice.device.friendlyName;
        this.DeviceId = vendorDevice.device.macAddress;
        vendorDevice.on('binaryState', (state) => {
            this.emit(Device.stateChangeEvent, state);
        });
    }
    setState(state: any): void {
        this.vendorDevice.setBinaryState(state);
    }
}