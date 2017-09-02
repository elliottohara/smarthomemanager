import { EventEmitter } from "events";
import { Device } from "./Device";

export interface ITrigger {
    AddRule(callback: (trigger: ITrigger ) => void): void;
}

export class TimeTrigger extends EventEmitter implements ITrigger {
    AddRule(callback: (trigger: ITrigger) => void): void {
        this.on(Device.stateChangeEvent, (timeTrigger: ITrigger) => {
            callback(this);
        });
    }

    constructor(private secondsInterval: number) {
        super();
        setInterval(() => {
            this.emit(Device.stateChangeEvent, this);
        }, secondsInterval * 1000);
    }

}