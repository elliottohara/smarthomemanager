import * as TpLink from 'tplink-lightbulb';
import { TpLinkLightBulb } from "./TpLinkLightBulb";
import { DeviceFactory } from "../DeviceFactory";

export class TpLinkLightBulbFactory extends DeviceFactory<TpLinkLightBulb> {
    constructor() {
        super();
    }
    public connect(): void {
        TpLink.scan().on('light', (light) => {
            let newBulb = new TpLink(light.host);
            //console.log(JSON.stringify(light));
            let client = new TpLinkLightBulb(newBulb, light);
            this.addClient(client);
        });
    }
}