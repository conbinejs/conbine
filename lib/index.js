import Context from "./core/Context";
export * from './commands/Command';
export * from './core/Context';
export * from './core/IInjectable';
export * from './decorators/Injectable';
export * from './events/ConbineEvent';
export * from './events/EventDispatcher';
export * from './services/Actor';
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
