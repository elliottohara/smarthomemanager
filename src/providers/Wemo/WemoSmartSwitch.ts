import { SmartSwitch } from "../SmartSwitch";
import * as Wemo from 'wemo-client';
import { Device } from "../Device";

export class WemoSmartSwitch extends SmartSwitch<number> {
    constructor(public wemoBulb: Wemo) {
        super();
        wemoBulb.on('binaryState', (state) => {
            this.emit(Device.stateChangeEvent, state);
        });
    }
    setState(state: any): void {
        this.wemoBulb.setBinaryState(state);
    }
    convertBinaryState(binaryState: boolean): number {
        return SmartSwitch.ConvertBoolToNumber(binaryState);
    }
    convertNativeState(tState: number): boolean {
        return SmartSwitch.ConvertNumberToBinary(tState);
    }
}