import { Device } from "../Device";
import * as Nest from 'unofficial-nest-api';

// This is probably not a NestThermostat, but actually the Nest "Structure"

export class NestThermostat extends Device {
    private lastState: any;
    private pollLength:number = 2000;
    constructor(public vendorDevice: any) {
        super();
        Nest.fetchStatus( (data) => {
            this.lastState = JSON.stringify(data);
            // this.emit(Device.stateChangeEvent, data);    
            this.Subscribe();
            });
    }
    setState(state: any): void {
        throw new Error('SetState not yet supported for NestThermostat');
    }
    private Subscribe(): void {
        Nest.subscribe(
            (deviceId, data, type) => this.subscribeDone(deviceId, data, type), ['structure']);
    }
    private subscribeDone(deviceId, data, type): void {
        if (deviceId) {
            let currentState = JSON.stringify(data);
            if ( this.lastState !== currentState) {
                this.emit(Device.stateChangeEvent, data);
                this.lastState = currentState;
            }
        }
        setTimeout(() => this.Subscribe, this.pollLength);
    }

}