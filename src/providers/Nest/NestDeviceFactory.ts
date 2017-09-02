import { DeviceFactory } from "../DeviceFactory";
import { NestThermostat } from "./NestThermostat";
import * as Nest from 'unofficial-nest-api';


export class NestDeviceFactory extends DeviceFactory<NestThermostat> {
    constructor(private config: any) {
        super();

    }
    connect(): void {
        Nest.login(this.config.nest.Email, this.config.nest.Password, (err, data) => {
            if(!err){
                this.emit('loggedIn', data);
            }else{
                this.emit('error', err);
                return;
            }
            this.addClient(new NestThermostat(data));
        });
    }
}