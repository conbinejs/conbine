import Context from "../core/Context";
import { IInjectable } from "../decorators/IInjectable";
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
export class Command implements IInjectable {

  public event: ConbineEvent;
  public context: Context;

  constructor(options: ICommandOptions) {
    this.event = options.event;
    this.context = options.context;
  }

  public async execute(): Promise<void> {
    throw new Error(`${this} must override the execute() method`);
  }

}
