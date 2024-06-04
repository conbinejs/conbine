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
export class Command<TEvent extends ConbineEvent = ConbineEvent> implements IInjectable {

  public event: TEvent;
  public context: Context;

  constructor(options: {
    context: Context;
    event: TEvent;
  }) {
    this.event = options.event;
    this.context = options.context;
  }

  public async execute(): Promise<void> {
    throw new Error(`${this} must override the execute() method`);
  }

}
