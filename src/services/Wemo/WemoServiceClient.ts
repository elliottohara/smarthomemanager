import { ServiceClient } from '../ServiceClient';
import * as Wemo from 'wemo-client';

export class WemoServiceClient extends ServiceClient {
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