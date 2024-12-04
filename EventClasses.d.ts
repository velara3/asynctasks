export declare class EventDispatcher {
    addEventListener(type: string, listener: any, useCapture?: boolean, scope?: any): void;
    removeEventListener(type: string, listener: any, useCapture?: boolean): void;
    removeAllEventListener(type?: string): void;
    dispatchEvent(event: Event): boolean;
}
export declare class Event {
    type: string;
    target: any;
    currentTarget: any;
    constructor(type: string, bubbling?: boolean, cancelable?: boolean);
    clone(): any;
}
