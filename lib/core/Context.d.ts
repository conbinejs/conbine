import { Command } from "../commands/Command";
import ConbineEvent from "../events/ConbineEvent";
import { EventDispatcher } from "../events/EventDispatcher";
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export declare class Context extends EventDispatcher {
    #private;
    /**
     * Map specified Command class the given event
     */
    mapCommand(eventType: string, commandClass: typeof Command): this;
    /**
     * Unmap specified Command class from given event
     */
    unmapCommand(eventType: string, commandClass: typeof Command): this;
    /**
     * Map class instance to a property name
     */
    mapSingleton(propertyName: string, singletonClass: new (...args: any[]) => any, ...args: any[]): this;
    /**
     * Unmap class instance from a property name
     */
    unmapSingleton(propertyName: string): this;
    /**
     * Map constant value to a property name
     */
    mapConstant(propertyName: string, value: any): this;
    /**
     * Unmap constant value from a property name
     */
    unmapConstant(propertyName: string): this;
    /**
     * Inject constants and singleton instances into specified object
     */
    inject(target: any, ...propertyNames: string[]): any;
    /**
     * Set constants and singleton instances on the specified object to undefined
     */
    uninject(obj: any, ...propertyNames: string[]): any;
    protected executeCommand: (event: ConbineEvent) => void;
}
export default Context;
