import { DeviceFactory } from "./providers/DeviceFactory";
import { Device } from "./providers/Device";

export interface Rule {
    EventName: string;
    Callback: (...args: any[]) => void;
}