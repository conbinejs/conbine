/**
 * Executes a command in response to an event dispatched from the event bus
 * The naming convention for a command class is EventItsMappedToCommand
 *
 * @see Context.mapCommand
 * @author	Neil Rackett
 */
export class Command {
    constructor(options) {
        this.event = options.event;
        this.context = options.context;
    }
    async execute() {
        throw new Error(`${this} must override the execute() method`);
    }
}
