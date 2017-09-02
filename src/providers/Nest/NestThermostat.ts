import { Device } from "../Device";
import * as Nest from 'unofficial-nest-api';

// This is probably not a NestThermostat, but actually the Nest "Structure"
// Each structure can have multiple thermostats

export class NestThermostat extends Device {
    private lastState: any;
    private pollLength:number = 2000;
    constructor(public vendorDevice: any) {
        super();
        Nest.fetchStatus( (data) => {
            this.lastState = data;
            // this.emit(Device.stateChangeEvent, data);    
            
            this.DeviceName = data.structure[Object.keys(data.structure)[0]].name;
            this.DeviceId = `Nest_${this.DeviceName}`;
            this.Subscribe();
            this.emit('named');
            });
    }
    setState(state: any): void {
        throw new Error('SetState not yet supported for NestThermostat');
    }
    private Subscribe(): void {
        Nest.subscribe(
            (deviceId, data, type) => {
                this.subscribeDone(deviceId, data, type), ['structure'];
            }, ['structure']);
    }
    private subscribeDone(deviceId, data, type): void {
        if (deviceId) {
            if ( JSON.stringify(this.lastState) !== data) {
                // TODO: Diff what changed, and emit more specific events
                
                if (this.lastState.away !== data.away) {
                    let event = data.away ? 
                        'away':'home';
                    this.emit(event, data);
                }
                this.emit(Device.stateChangeEvent, data);
                this.lastState = data;
            }
        }
        setTimeout(() => this.Subscribe(), this.pollLength);
    }

}