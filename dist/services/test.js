"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TpLinkServiceStream_1 = require("./TpLink/TpLinkServiceStream");
const WemoServiceStream_1 = require("./Wemo/WemoServiceStream");
const Bulb = require("tplink-lightbulb");
const TpLinkServiceClient_1 = require("./TpLink/TpLinkServiceClient");
/* this is just a few end2end tests, execute them on a network with the proper devices */
Wemo();
// TpLink();
function TpLink() {
    let stream = new TpLinkServiceStream_1.TpLinkServiceStream();
    stream.onDeviceDiscovered((bulb) => {
        console.log(JSON.stringify(bulb['info']));
        bulb.OnStateChange((state) => {
            console.log(JSON.stringify(state));
        });
    });
    stream.connect();
}
function Wemo() {
    let stream = new WemoServiceStream_1.WemoServiceStream();
    stream.onDeviceDiscovered((bulb) => {
        bulb.OnStateChange((state) => {
            console.log(bulb['wemoBulb'].device.friendlyName + JSON.stringify(state));
        });
    });
    stream.connect();
}
function TurnOnTPLinkLight() {
    // an IP of a TpLink bulb
    const bulbIp = '192.168.1.182';
    const tpLinkBulb = new Bulb(bulbIp);
    const client = new TpLinkServiceClient_1.TpLinkServiceClient(tpLinkBulb);
    client.setState(1);
}
