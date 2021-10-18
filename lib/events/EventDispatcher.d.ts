import ConbineEvent from "./ConbineEvent";
/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export declare class EventDispatcher {
    #private;
    constructor();
    dispatchEvent(event: ConbineEvent): this;
    addEventListener(type: string, listener: Function, options?: IEventListenerOptions): this;
    removeEventListener(type: string, listener: Function): this;
    hasEventListener(type: string): boolean;
}
interface IEventListenerOptions {
    priority?: number;
    once?: boolean;
}
export {};
