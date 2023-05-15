import Context from "../core/Context";
import ConbineEvent from "../events/ConbineEvent";

/**
 * Executes a command in response to an event dispatched from the event bus
 * The naming convention for a command class is EventItsMappedToCommand
 *
 * @see EventBus.mapCommand
 * @author	Neil Rackett
 */
export class Command {

  constructor(
    public event: ConbineEvent,
    public context: Context,
  ) { }

  async execute() {
    throw new Error(`${this} must override the execute() method`);
  }

}
