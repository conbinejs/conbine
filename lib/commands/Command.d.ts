import Context from "../core/Context";
import ConbineEvent from "../events/ConbineEvent";
/**
 * Executes a command in response to an event dispatched from the event bus
 * The naming convention for a command class is EventItsMappedToCommand
 *
 * @see EventBus.mapCommand
 * @author	Neil Rackett
 */
export declare class Command {
    event: ConbineEvent;
    context: Context;
    constructor(event: ConbineEvent, context: Context);
    execute(): Promise<void>;
}
