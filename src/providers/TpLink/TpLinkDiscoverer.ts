import * as TpLink from 'tplink-lightbulb';
import { Discoverer } from "../Discoverer";
import { TpLinkLightBulb } from "./TpLinkLightBulb";

export class TpLinkDiscoverer extends Discoverer<TpLinkLightBulb> {
    constructor() {
        super();
    }
    public connect(): void {
        TpLink.scan().on('light', (light) => {
            let newBulb = new TpLink(light.host);
            console.log(JSON.stringify(light));
            let client = new TpLinkLightBulb(newBulb, light);
            this.addClient(client);
        });
    }
}