import Context from "./core/Context.js";

export * from './commands/Command.js';
export * from './core/Context.js';
export * from './core/IInjectable.js';
export * from './decorators/Injectable.js';
export * from './events/ConbineEvent.js';
export * from './events/EventDispatcher.js';
export * from './services/Actor.js';

/**
 * Ready-made Context instance for anyone who just wants a ready-to-go event
 * bus without having to write any code
 *
 * @example
 * import { ConbineEvent, eventBus } from 'conbine';
 * eventBus.addEventListener('hello', event => console.log(event.data));
 * eventBus.dispatchEvent(new ConbineEvent('hello', 'Hello, World!'))
 */
export const eventBus = new Context();