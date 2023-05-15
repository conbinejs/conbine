import ConbineEvent from "./ConbineEvent";

/**
 * Event dispatcher interface
 * @author	Neil Rackett
 */
export interface IEventDispatcher {
  dispatchEvent(event: ConbineEvent): this;
  addEventListener(type: string, listener: Function, options?: IEventListenerOptions): this;
  removeEventListener(type: string, listener: Function): this;
  hasEventListener(type: string): boolean;
}

/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export class EventDispatcher implements IEventDispatcher {

  #listeners: any;

  constructor() {
    this.#listeners = {};
  }

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

  public addEventListener = (type: string, listener: Function, options?: IEventListenerOptions): this => {
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
      return (a.options.priority || 0) - (a.options.priority || 0);
    });
    return this;
  };

  public removeEventListener = (type: string, listener: Function): this => {
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

  public hasEventListener = (type: string): boolean => {
    return !!this.#listeners[type];
  };
}

interface IEventListener {
  listener: Function,
  options: IEventListenerOptions,
}

interface IEventListenerOptions {
  priority?: number,
  once?: boolean,
}

const defaultEventListenerOptions: IEventListenerOptions = {
  priority: 0,
  once: false,
};