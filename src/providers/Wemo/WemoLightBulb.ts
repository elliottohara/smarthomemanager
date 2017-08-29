import * as Wemo from 'wemo-client';
import { Device } from "../Device";

export class WemoLightBulb extends Device {
    constructor(public wemoBulb: Wemo) {
        super();
        // Wemos handle their own events, and emit a 'binaryState', let's just map it
        wemoBulb.on('binaryState', (state) => {
            this.emit(this.stateChangeEvent, state);
        });
    }
    setState(state: any): void {
        this.wemoBulb.setBinaryState(state);
    }
}