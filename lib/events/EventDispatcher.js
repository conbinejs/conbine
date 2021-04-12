"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listeners;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
/**
 * Event dispatcher
 * @author	Neil Rackett
 */
class EventDispatcher {
    constructor() {
        _listeners.set(this, void 0);
        __classPrivateFieldSet(this, _listeners, {});
    }
    dispatchEvent(event) {
        if (!event || !event.type) {
            throw new Error('Event type not specified');
        }
        if (!event.target) {
            event.target = this;
        }
        if (__classPrivateFieldGet(this, _listeners)[event.type]) {
            __classPrivateFieldGet(this, _listeners)[event.type].forEach((eventListener) => {
                eventListener.listener(event);
            });
        }
        return this;
    }
    addEventListener(type, listener, options = {}) {
        if (!type) {
            throw new Error('Event type not specified');
        }
        if (typeof listener !== 'function') {
            throw new Error('Event listener must be a function');
        }
        if (!__classPrivateFieldGet(this, _listeners)[type]) {
            __classPrivateFieldGet(this, _listeners)[type] = [];
        }
        if (!__classPrivateFieldGet(this, _listeners)[type].find((eventListener) => eventListener.listener === listener)) {
            __classPrivateFieldGet(this, _listeners)[type].push({ listener, options });
            __classPrivateFieldGet(this, _listeners)[type].sort((a, b) => {
                return ~~a.options.priority - ~~b.options.priority;
            });
        }
        return this;
    }
    removeEventListener(type, listener) {
        if (!type) {
            throw new Error('Event type not specified');
        }
        if (typeof listener !== 'function') {
            throw new Error('Event listener must be a function');
        }
        if (__classPrivateFieldGet(this, _listeners)[type]) {
            __classPrivateFieldGet(this, _listeners)[type] = __classPrivateFieldGet(this, _listeners)[type].filter((eventListener) => {
                return eventListener.listener !== listener;
            });
            if (!__classPrivateFieldGet(this, _listeners)[type].length) {
                delete __classPrivateFieldGet(this, _listeners)[type];
            }
        }
        return this;
    }
    hasEventListener(type) {
        return !!__classPrivateFieldGet(this, _listeners)[type];
    }
}
exports.EventDispatcher = EventDispatcher;
_listeners = new WeakMap();
