import { Command } from "../commands/Command";
import { EventDispatcher } from "../events/EventDispatcher";
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export declare class Context extends EventDispatcher {
    #private;
    constructor();
    mapCommand(eventType: string, commandClass: typeof Command): this;
    unmapCommand(eventType: string, commandClass: typeof Command): this;
    private _executeCommand;
}
export default Context;
