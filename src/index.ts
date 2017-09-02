// first get all devices

import { DiscovererFactory } from "./providers/DiscovererFactory";
import { Device } from "./providers/Device";
import { TpLinkLightBulb } from "./providers/TpLink/TpLinkLightBulb";
import { TpLinkLightBulbFactory } from "./providers/TpLink/TpLinkLightBulbFactory";
import { Rule } from './Rule';
import { WemoDeviceFactory } from "./providers/Wemo/WemoDeviceFactory";
import { WemoDevice } from "./providers/Wemo/WemoDevice";
// TODO: abstract this, and eventually put a UI on it...
// The key here is the device id for your smart device
// the callback takes the state the trigger reported, 
// the factory that discovers your devices (so you can pick a target)
// and the actual device that triggered the rule (same one as the device Id)

// The rules specified here are two wemo switches that I have wired up to a three way right now
// so that if either is on, it turns on. Since the wemo's setstate methods are idempotent, there's
// no worry about ending up in some silly loop.

let rules: { [id: string]: Rule; } = {
    '6038E04679F0': {
        'EventName': Device.stateChangeEvent,
        'Callback': (state: any, discoverer: WemoDeviceFactory, bulb: WemoDevice) => {
            console.log(`Running rule for device ${bulb.DeviceName}`);
            let target = discoverer.clients
            .find( (d) => d.DeviceId === '6038E0466220');
            target.setState(state);
        }
    },
    '6038E0466220': {
        'EventName': Device.stateChangeEvent,
        'Callback': (state: any, discoverer: WemoDeviceFactory, bulb: WemoDevice) => {
            console.log(`Running rule for device ${bulb.DeviceName}`);
            let target = discoverer.clients
            .find( (d) => d.DeviceId === '6038E04679F0');
            target.setState(state);
        }
    }

};

let factory = new DiscovererFactory();
factory.GetAll().forEach((discoverer) => {
    discoverer.onDeviceDiscovered((device) => {
        // TODO: Wire up config driven rules here
        console.log(`Found ${device.DeviceName}, DeviceID: ${device.DeviceId}`);
        let rule = rules[device.DeviceId]
        if (rule) {
            console.log(`Found rule for ${device.DeviceName}. Adding....`);
            device.on(rule.EventName, (state) => {
                try {
                    rule.Callback(state, discoverer, device);
                } catch(error) {
                    console.error(error);
                }
            });
        }
    });
    discoverer.connect();
});

