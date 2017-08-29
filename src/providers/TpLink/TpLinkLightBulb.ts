import { Device } from '../../providers/Device';
import { Bulb } from 'tplink-lightbulb';

const POLL_INTERVAL = 500;
export class TpLinkLightBulb extends Device {
    private state: string;
    constructor(public tpLinkBulb: Bulb, public info: any) {
        super();
        // we also need to set up polling since TpLink doesn't emit events
        this.watch();
    }
    public setState(state: any): void {
        this.tpLinkBulb.set(state);
    }
    private watch(): void {
        setInterval(() => {
            this.setInfo();
        }, POLL_INTERVAL);
    }
    private setInfo(): void {
        this.tpLinkBulb.info().then( (info) => {
            if (JSON.stringify(this.state) !== JSON.stringify(info.light_state)) {
                    this.emit(this.stateChangeEvent, info.light_state);
                    this.state = info.light_state;
                }
        });
    }
}
