import { Command } from "../commands/Command";
import ConbineEvent from "../events/ConbineEvent";
import { EventDispatcher } from "../events/EventDispatcher";

/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export class Context extends EventDispatcher {

  #commands: any[];

  constructor() {
    super();
    this.#commands = [];
    this._executeCommand = this._executeCommand.bind(this);
  }

  public mapCommand(eventType: string, commandClass: typeof Command): this {
    this.unmapCommand(eventType, commandClass);
    this.addEventListener(eventType, this._executeCommand);
    this.#commands.push({ eventType, commandClass });
    return this;
  }

  public unmapCommand(eventType: string, commandClass: typeof Command): this {
    this.#commands = this.#commands.filter(command => {
      return !(command.eventType === eventType && command.commandClass === commandClass);
    });
    if (!this.#commands.filter(command => command.eventType === eventType).length) {
      this.removeEventListener(eventType, this._executeCommand);
    }
    return this;
  }

  private _executeCommand(event: ConbineEvent): void {
    const commands = this.#commands.filter(command => command.eventType === event.type);
    commands.forEach(command => {
      const cmd = new command.commandClass();
      cmd.execute(event);
    });
  }
}

export default Context;