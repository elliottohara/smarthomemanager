import { Device } from './Device';
import { EventEmitter } from 'events';

export abstract class DeviceFactory<TClient extends Device> extends EventEmitter {
    private deviceDiscovered = 'DeviceDiscovered';
    private _clients: Array<TClient>;
    constructor() {
        super();
        this._clients = [];
    }
    abstract connect(): void;
    public onDeviceDiscovered(callback: (device: TClient ) => void):void {
        this.addListener(this.deviceDiscovered, callback);
    }
    public get clients(): Array<TClient> {
        return this._clients;
    }
    protected addClient(client: TClient): void {
        this.clients.push(client);
        this.emit(this.deviceDiscovered, client);
    }
    
}
