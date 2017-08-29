import { ServiceStream } from '../ServiceStream';
import { ServiceClient } from "../ServiceClient";
import * as TpLink from 'tplink-lightbulb';
import { TpLinkServiceClient } from './TpLinkServiceClient';

export class TpLinkServiceStream extends ServiceStream<TpLinkServiceClient> {
    constructor() {
        super();
    }
    public connect(): void {
        TpLink.scan().on('light', (light) => {
            let newBulb = new TpLink(light.host);
            console.log(JSON.stringify(light));
            let client = new TpLinkServiceClient(newBulb, light);
            this.addClient(client);
        });
    }
}