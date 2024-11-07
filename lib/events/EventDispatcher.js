var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventDispatcher_listeners;
/**
 * Event dispatcher
 * @author	Neil Rackett
 */
export class EventDispatcher {
    constructor() {
        _EventDispatcher_listeners.set(this, void 0);
        this.dispatchEvent = (event) => {
            if (!event || !event.type) {
                throw new Error('Event type not specified');
            }
            if (!event.target) {
                event.target = this;
            }
            const { type } = event;
            if (__classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type]) {
                __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type].forEach((eventListener) => {
                    const { listener, options } = eventListener;
                    listener(event);
                    if (options.once) {
                        this.removeEventListener(type, listener);
                    }
                });
            }
            return this;
        };
        this.addEventListener = (type, listener, options) => {
            options = Object.assign({}, defaultEventListenerOptions, options);
            if (!type) {
                throw new Error('Event type not specified');
            }
            if (typeof listener !== 'function') {
                throw new Error('Event listener must be a function');
            }
            this.removeEventListener(type, listener);
            if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type]) {
                __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type] = [];
            }
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type].push({ listener, options });
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type].sort((a, b) => {
                return (a.options.priority || 0) - (a.options.priority || 0);
            });
            return this;
        };
        this.removeEventListener = (type, listener) => {
            if (!type) {
                throw new Error('Event type not specified');
            }
            if (typeof listener !== 'function') {
                throw new Error('Event listener must be a function');
            }
            if (__classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type]) {
                __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type] = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type].filter((eventListener) => {
                    return eventListener.listener !== listener;
                });
                if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type].length) {
                    delete __classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type];
                }
            }
            return this;
        };
        this.hasEventListener = (type) => {
            return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f")[type];
        };
        __classPrivateFieldSet(this, _EventDispatcher_listeners, {}, "f");
    }
}
_EventDispatcher_listeners = new WeakMap();
const defaultEventListenerOptions = {
    priority: 0,
    once: false,
};
