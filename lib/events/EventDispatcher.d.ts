import ConbineEvent from "./ConbineEvent";
/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export declare class EventDispatcher {
    #private;
    constructor();
    dispatchEvent(event: ConbineEvent): this;
    addEventListener(type: string, listener: Function, options?: any): this;
    removeEventListener(type: string, listener: Function): this;
    hasEventListener(type: string): boolean;
}
