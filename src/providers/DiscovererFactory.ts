

import { TpLinkLightBulbFactory } from "./TpLink/TpLinkLightBulbFactory";
import { WemoDeviceFactory } from "./Wemo/WemoDeviceFactory";

export class DiscovererFactory {
    // TODO: I know there's a better way to do this, but for now....
    public GetDiscoverer(type:{new()}): any {
        return new type();
    }
    public GetAll(): Array<any>{
        return [
            this.GetDiscoverer(TpLinkLightBulbFactory),
            this.GetDiscoverer(WemoDeviceFactory)
        ];
    }
}