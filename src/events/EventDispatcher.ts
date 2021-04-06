import ConbineEvent from "./ConbineEvent";

/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export class EventDispatcher {

  #listeners: any;

  constructor() {
    this.#listeners = {};
  }

  public dispatchEvent(event: ConbineEvent): this {
    if (!event || !event.type) {
      throw new Error('Event type not specified');
    }
    if (!event.target) {
      event.target = this;
    }
    if (this.#listeners[event.type]) {
      this.#listeners[event.type].forEach((eventListener: IEventListener) => {
        eventListener.listener(event);
      });
    }
    return this;
  }

  public addEventListener(type: string, listener: Function, options?: any): this {
    if (!type) {
      throw new Error('Event type not specified');
    }
    if (typeof listener !== 'function') {
      throw new Error('Event listener must be a function');
    }
    if (!this.#listeners[type]) {
      this.#listeners[type] = [];
    }
    if (!this.#listeners[type].find((eventListener: IEventListener) => eventListener.listener === listener)) {
      this.#listeners[type].push({ listener, options });
      this.#listeners[type].sort((a: IEventListener, b: IEventListener) => {
        return ~~a.options.priority - ~~b.options.priority;
      });
    }
    return this;
  }

  public removeEventListener(type: string, listener: Function): this {
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
        delete this.#listeners[type].length;
      }
    }
    return this;
  }

  public hasEventListener(type: string): boolean {
    return !!this.#listeners[type];
  }
}

interface IEventListener {
  listener: Function,
  options: IEventListenerOptions,
}

interface IEventListenerOptions {
  // TODO Implement... eventClass: typeof ConbineEvent,
  priority: number,
}
