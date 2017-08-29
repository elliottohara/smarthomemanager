import { ServiceClient } from './ServiceClient';
import { EventEmitter } from 'events';

export abstract class ServiceStream<TServiceClient extends ServiceClient> extends EventEmitter {
    private deviceDiscovered = 'DeviceDiscovered';
    private _clients: Array<TServiceClient>;
    constructor() {
        super();
        this._clients = [];
    }
    abstract connect(): void;
    public onDeviceDiscovered(callback: (device: TServiceClient ) => void):void {
        this.addListener(this.deviceDiscovered, callback);
    }
    public get clients(): Array<TServiceClient> {
        return this._clients;
    }
    protected addClient(client: TServiceClient): void {
        this.clients.push(client);
        this.emit(this.deviceDiscovered, client);
    }
    
}
