import { TpLinkServiceStream } from './TpLink/TpLinkServiceStream';
import { WemoServiceStream } from './Wemo/WemoServiceStream';
import * as Wemo from 'wemo-client';
import * as Bulb from 'tplink-lightbulb';
import { TpLinkServiceClient } from "./TpLink/TpLinkServiceClient";

/* this is just a few end2end tests, execute them on a network with the proper devices */
Wemo();
// TpLink();
function TpLink() {
    let stream = new TpLinkServiceStream();
    stream.onDeviceDiscovered((bulb) => {
        console.log(JSON.stringify(bulb['info']));
        bulb.OnStateChange( (state) => {
            console.log(JSON.stringify(state) );
        });
    });
    stream.connect();
}

function Wemo() {
    let stream = new WemoServiceStream();
    stream.onDeviceDiscovered((bulb) => {
        bulb.OnStateChange( (state) => {
            console.log(bulb['wemoBulb'].device.friendlyName + JSON.stringify(state) );
        });
    });
    stream.connect();
}

function TurnOnTPLinkLight() {
    // an IP of a TpLink bulb
    const bulbIp = '192.168.1.182';
    const tpLinkBulb = new Bulb(bulbIp);
    const client = new TpLinkServiceClient(tpLinkBulb);
    client.setState(1);
}

