import { Device } from "./Device";

export abstract class SmartSwitch<TBinaryState> extends Device {
    public static OnEvent: string = 'OnEvent';
    public static OffEvent: string = 'OffEvent';
    public static ConvertNumberToBinary = (n:number) => n === 0? false:true;
    public static ConvertBoolToNumber = (n:boolean) => n ? 1:0;
    constructor() {
        super();
        this.on(this.stateChangeEvent, (state) => {
            let event = this.convertNativeState(state) ?
                SmartSwitch.OnEvent: SmartSwitch.OffEvent;
            this.emit(event, state);
        });
    }
    abstract setState(state: any): void ;
    abstract convertBinaryState(binaryState: boolean): TBinaryState;
    abstract convertNativeState(tState: TBinaryState): boolean;
    public turnOn() {
        this.setState(this.convertBinaryState(true));
    }
    public turnOff() {
        this.setState(this.convertBinaryState(false));
    }
}