import  { EventEmitter } from 'events';

export abstract class ServiceClient extends EventEmitter {
    protected stateChangeEvent = 'StateChange';
    constructor() {
        super();
    }
    abstract setState(state: any): void;
    // TODO: should this return a promise?
    public OnStateChange(callback: (serviceClient:ServiceClient) => void) {
        this.addListener(this.stateChangeEvent, callback);
    }
}
