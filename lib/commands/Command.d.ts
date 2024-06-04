import Context from "../core/Context";
import { IInjectable } from "../core/IInjectable";
import ConbineEvent from "../events/ConbineEvent";
/**
 * Executes a command in response to an event dispatched from the event bus
 * The naming convention for a command class is EventItsMappedToCommand
 *
 * @see Context.mapCommand
 * @author	Neil Rackett
 */
export declare class Command<TEvent extends ConbineEvent = ConbineEvent> implements IInjectable {
    event: TEvent;
    context: Context;
    constructor(options: {
        context: Context;
        event: TEvent;
    });
    execute(): Promise<void>;
}
