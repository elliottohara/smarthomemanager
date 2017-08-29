import  { EventEmitter } from 'events';

export abstract class Device extends EventEmitter {
    public static stateChangeEvent = 'StateChange';
    public DeviceName: string;
    public DeviceId: string;
    constructor() {
        super();
    }
    abstract setState(state: any): void;
    // TODO: should this return a promise?
    public OnStateChange(callback: (serviceClient:Device) => void) {
        this.addListener(Device.stateChangeEvent, callback);
    }
}
