import ConbineEvent from "./ConbineEvent";
/**
 * Event dispatcher interface
 * @author	Neil Rackett
 */
export interface IEventDispatcher {
    dispatchEvent(event: ConbineEvent): this;
    addEventListener(type: string, listener: Function, options?: IEventListenerOptions): this;
    removeEventListener(type: string, listener: Function): this;
    hasEventListener(type: string): boolean;
}
/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export declare class EventDispatcher implements IEventDispatcher {
    #private;
    constructor();
    dispatchEvent: (event: ConbineEvent) => this;
    addEventListener: (type: string, listener: Function, options?: IEventListenerOptions | undefined) => this;
    removeEventListener: (type: string, listener: Function) => this;
    hasEventListener: (type: string) => boolean;
}
interface IEventListenerOptions {
    priority?: number;
    once?: boolean;
}
export {};
