// first get all devices

import { DiscovererFactory } from "./providers/DiscovererFactory";
import { Device } from "./providers/Device";
import { TpLinkLightBulb } from "./providers/TpLink/TpLinkLightBulb";
import { TpLinkLightBulbFactory } from "./providers/TpLink/TpLinkLightBulbFactory";

// TODO: abstract this, and eventually put a UI on it...
let rules = {
    '8012312587D7B641D51DEE59745BF4B7180F8536': {
        'EventName': Device.stateChangeEvent,
        'Callback': (state: any, discoverer: TpLinkLightBulbFactory, bulb: TpLinkLightBulb) => {
            let target = discoverer.clients
            .find( (d) => d.DeviceId === '8012121AFF2D68C479B989DD45248AAA1862E940');
            target.setState(state.on_off);
        }
    },

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
                rule.Callback(state, discoverer, device);
            });
        }
    });
    discoverer.connect();
});

