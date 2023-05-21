import Context from "../core/Context";
import ConbineEvent from "../events/ConbineEvent";
interface ICommandOptions {
    context: Context;
    event: ConbineEvent;
}
/**
 * Executes a command in response to an event dispatched from the event bus
 * The naming convention for a command class is EventItsMappedToCommand
 *
 * @see Context.mapCommand
 * @author	Neil Rackett
 */
export declare class Command {
    event: ConbineEvent;
    context: Context;
    constructor(options: ICommandOptions);
    execute(): Promise<void>;
}
export {};
