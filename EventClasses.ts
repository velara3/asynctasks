

export class EventDispatcher
{
    addEventListener(type: string, listener: any, useCapture?: boolean, scope?: any): void {

    }

    removeEventListener(type: string, listener: any, useCapture?: boolean): void {

    }
    removeAllEventListener(type?: string): void {

    }

    dispatchEvent(event: Event): boolean {
        return true;
    }
}

export class Event
{
    public type: string;

    public target: any;
    public currentTarget: any;

    constructor(type: string, bubbling?: boolean, cancelable?: boolean) {
        this.type = type;
    }

    clone(): any {

    }
}