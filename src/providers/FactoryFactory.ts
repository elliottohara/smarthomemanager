

import { TpLinkLightBulbFactory } from "./TpLink/TpLinkLightBulbFactory";
import { WemoDeviceFactory } from "./Wemo/WemoDeviceFactory";
import { NestDeviceFactory } from "./Nest/NestDeviceFactory";
export class FactoryFactory {
    private allFactories: Array<any>;
    constructor() {
        this.allFactories = [
            new TpLinkLightBulbFactory(),
            new WemoDeviceFactory(),
            new NestDeviceFactory()
        ];
    }
    // TODO: I know there's a better way to do this, but for now....
    public GetFactory(type:{new()}): any {
        return this.allFactories.find( (factory) => {
            return type.name === factory.constructor.name;
        });
    }
    public GetAll(): Array<any>{
        return this.allFactories;
    }
}