import { Command } from "../commands/Command";
import ConbineEvent from "../events/ConbineEvent";
import { EventDispatcher } from "../events/EventDispatcher";
import { Actor } from "../services/Actor";

/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export class Context extends EventDispatcher {

  #commands: any[] = [];
  #singletons: any = {};

  /**
   * Map specified Command class the given event
   */
  public mapCommand(eventType: string, commandClass: typeof Command<ConbineEvent>): this {
    this.unmapCommand(eventType, commandClass);
    this.addEventListener(eventType, this.executeCommand);
    this.#commands.push({ eventType, commandClass });
    return this;
  }

  /**
   * Unmap specified Command class from given event
   */
  public unmapCommand(eventType: string, commandClass: typeof Command<ConbineEvent>): this {
    this.#commands = this.#commands.filter(command => {
      return !(command.eventType === eventType && command.commandClass === commandClass);
    });
    if (!this.#commands.filter(command => command.eventType === eventType).length) {
      this.removeEventListener(eventType, this.executeCommand);
    }
    return this;
  }

  /**
   * Map class instance to a property name
   */
  public mapSingleton(propertyName: string, singletonClass: new (...args: any[]) => any, ...args: any[]) {

    if (!propertyName) throw new Error('propertyName cannot be undefined');

    if (Actor.isPrototypeOf(singletonClass)) {
      args[0] = Object.assign(args[0] ?? {}, { context: this });
    }

    this.#singletons[propertyName] = typeof singletonClass === 'function'
      ? new singletonClass(...args)
      : this.#singletons[propertyName] = singletonClass;

    return this;

  }

  /**
   * Unmap class instance from a property name
   */
  public unmapSingleton(propertyName: string): this {
    if (!propertyName) throw new Error('propertyName cannot be undefined');
    delete this.#singletons[propertyName];
    return this;
  }

  /**
   * Map constant value to a property name
   */
  public mapConstant(propertyName: string, value: any): this {
    if (!propertyName) throw new Error('propertyName cannot be undefined');
    this.#singletons[propertyName] = value;
    return this;
  }

  /**
   * Unmap constant value from a property name
   */
  public unmapConstant(propertyName: string): this {
    return this.unmapSingleton(propertyName);
  }

  /**
   * Inject constants and singleton instances into specified object
   */
  public inject(target: any, ...keys: string[]): any {
    if (!keys.length) {
      keys = Object.keys(target);
    }

    for (const key in this.#singletons) {
      if (keys.includes(key)) {
        const value = this.#singletons[key];
        target[key] ?? Object.defineProperty(target, key, {
          configurable: true,
          get() { return value; }
        });
      }
    }

    return target;
  }

  /**
   * Delete injected constants and singleton instances on the specified object
   */
  public uninject(obj: any, ...keys: string[]): any {
    if (!keys.length) {
      keys = Object.keys(obj);
    }

    for (const key in this.#singletons) {
      if (keys.includes(key)) {
        delete obj[key];
      }
    }

    return obj;
  }

  protected executeCommand = (event: ConbineEvent): void => {
    const commands = this.#commands.filter(command => command.eventType === event.type);
    commands.forEach(command => {
      const cmd = new command.commandClass({ event, context: this });
      cmd.execute();
    });
  };

}

export default Context;