import * as Wemo from 'wemo-client';
import { Device } from "../Device";

export class WemoDevice extends Device {
    constructor(public wemoBulb: Wemo) {
        super();
        wemoBulb.on('binaryState', (state) => {
            this.emit(this.stateChangeEvent, state);
        });
    }
    setState(state: any): void {
        this.wemoBulb.setBinaryState(state);
    }
}