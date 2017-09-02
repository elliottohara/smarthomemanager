import { DeviceFactory } from "../DeviceFactory";
import { NestThermostat } from "./NestThermostat";
import * as Nest from 'unofficial-nest-api';
const defaultConfig = require('../../configs/config.json');


export class NestDeviceFactory extends DeviceFactory<NestThermostat> {
    constructor(private config: any = defaultConfig) {
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
            // Need some callbacks to execute before we can identify it,
            // so don't add client until it emits the event
            let nestDevice = new NestThermostat(data);
            nestDevice.on('named', () => {
                this.addClient(nestDevice);
            });
            
        });
    }
}