
import ConbineEvent from "./ConbineEvent.js";

type TEventListener<E extends ConbineEvent = ConbineEvent> = (event: E) => any;

/**
 * Event dispatcher interface
 * @author	Neil Rackett
 */
export interface IEventDispatcher<E extends ConbineEvent = ConbineEvent> {
  dispatchEvent(event: ConbineEvent): this;
  addEventListener<T extends ConbineEvent = E>(type: string, listener: TEventListener<T>, options?: IEventListenerOptions): this;
  removeEventListener<T extends ConbineEvent = E>(type: string, listener: TEventListener<T>): this;
  removeAllEventListeners(type?: string, options?: IEventListenerOptions): this;
  hasEventListener(type: string): boolean;
}

/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export class EventDispatcher<E extends ConbineEvent = ConbineEvent> implements IEventDispatcher<E> {
  #listeners: Record<string, IEventListener[]> = {};

  public dispatchEvent = (event: ConbineEvent): this => {
    if (!event || !event.type) {
      throw new Error('Event type not specified');
    }
    if (!event.target) {
      event.target = this;
    }
    const { type } = event;
    if (this.#listeners[type]) {
      this.#listeners[type].forEach((eventListener: IEventListener) => {
        const { listener, options } = eventListener;
        listener(event);
        if (options.once) {
          this.removeEventListener(type, listener);
        }
      });
    }
    return this;
  };

  public addEventListener = <T extends ConbineEvent = E>(type: string, listener: TEventListener<T>, options?: IEventListenerOptions): this => {
    options = Object.assign({}, defaultEventListenerOptions, options);
    if (!type) {
      throw new Error('Event type not specified');
    }
    if (typeof listener !== 'function') {
      throw new Error('Event listener must be a function');
    }
    this.removeEventListener(type, listener);
    if (!this.#listeners[type]) {
      this.#listeners[type] = [];
    }
    this.#listeners[type].push({ listener, options });
    this.#listeners[type].sort((a: IEventListener, b: IEventListener) => {
      return (a.options.priority || 0) - (b.options.priority || 0);
    });
    return this;
  };

  public removeEventListener = <T extends ConbineEvent = E>(type: string, listener: TEventListener<T>): this => {
    if (!type) {
      throw new Error('Event type not specified');
    }
    if (typeof listener !== 'function') {
      throw new Error('Event listener must be a function');
    }
    if (this.#listeners[type]) {
      this.#listeners[type] = this.#listeners[type].filter((eventListener: IEventListener) => {
        return eventListener.listener !== listener;
      });
      if (!this.#listeners[type].length) {
        delete this.#listeners[type];
      }
    }
    return this;
  };

  /**
   * Removes all event listeners, optionally limited to listeners of a specific type and/or group
   */
  public removeAllEventListeners = (type?: string, options?: IEventListenerOptions): this => {
    if (type || options?.group) {
      const keys = type ? [type] : Object.keys(this.#listeners);
      for (const key of keys) {
        this.#listeners[key] = this.#listeners[key].filter((eventListener: IEventListener) => {
          return !!options?.group && options.group !== eventListener.options.group;
        });
        if (!this.#listeners[key].length) {
          delete this.#listeners[key];
        }
      }
    } else {
      this.#listeners = {};
    }
    return this;
  };

  public hasEventListener = (type: string, options?: IEventListenerOptions): boolean => {
    if (!type) {
      throw new Error('Event type not specified');
    }
    if (options?.group) {
      return !!this.#listeners[type]?.find((eventListener: IEventListener) => {
        return eventListener.options.group === options.group;
      });
    }
    return !!this.#listeners[type];
  };
}


interface IEventListener {
  listener: TEventListener<any>,
  options: IEventListenerOptions,
}

interface IEventListenerOptions {
  priority?: number,
  once?: boolean,
  group?: any,
}

const defaultEventListenerOptions: IEventListenerOptions = {
  priority: 0,
  once: false,
};