import * as Wemo from 'wemo-client';
import * as Bulb from 'tplink-lightbulb';
import { TpLinkLightBulbFactory } from "./TpLink/TpLinkLightBulbFactory";
import { TpLinkLightBulb } from "./TpLink/TpLinkLightBulb";
import { WemoDeviceFactory } from './Wemo/WemoDeviceFactory';
import { NestDeviceFactory } from './Nest/NestDeviceFactory';
/* this is just a few end2end tests, execute them on a network with the proper devices */
// Wemo();
// TpLink();
NestStuff();
function TpLink() {
    let stream = new TpLinkLightBulbFactory();
    stream.onDeviceDiscovered((bulb) => {
        console.log(JSON.stringify(bulb['info']));
        bulb.OnStateChange( (state) => {
            console.log(JSON.stringify(state) );
        });
    });
    stream.connect();
}

function Wemo() {
    let stream = new WemoDeviceFactory();
    stream.onDeviceDiscovered((bulb) => {
        bulb.OnStateChange( (state) => {
            console.log(bulb['vendorDevice'].device.friendlyName + JSON.stringify(state) );
        });
    });
    stream.connect();
}

function TurnOnTPLinkLight() {
    // an IP of a TpLink bulb 
    const bulbIp = '192.168.1.182';
    const tpLinkBulb = new Bulb(bulbIp);
    const client = new TpLinkLightBulb(tpLinkBulb, {blah: 'boom'});
    client.setState(1);
}

function NestStuff() {
    const config = require('../configs/config.json');
    const factory = new NestDeviceFactory(config);
    factory.onDeviceDiscovered( (device) => {
        device.OnStateChange((state) => console.log(state));
        device.on('home', (x) => {
            console.log("HOME!");
        })
        device.on('away', (x)=>{
            console.log("AWAY");
        });
    });

    factory.connect();
}

