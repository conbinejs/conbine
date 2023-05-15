"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _commands, _singletons, _executeCommand;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const EventDispatcher_1 = require("../events/EventDispatcher");
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
class Context extends EventDispatcher_1.EventDispatcher {
    constructor() {
        super(...arguments);
        _commands.set(this, []);
        _singletons.set(this, {});
        _executeCommand.set(this, (event) => {
            const commands = __classPrivateFieldGet(this, _commands).filter(command => command.eventType === event.type);
            commands.forEach(command => {
                const cmd = new command.commandClass(event, this);
                this.inject(cmd);
                cmd.execute();
            });
        });
    }
    /**
     * Map specified Command class the given event
     */
    mapCommand(eventType, commandClass) {
        this.unmapCommand(eventType, commandClass);
        this.addEventListener(eventType, __classPrivateFieldGet(this, _executeCommand));
        __classPrivateFieldGet(this, _commands).push({ eventType, commandClass });
        return this;
    }
    /**
     * Unmap specified Command class from given event
     */
    unmapCommand(eventType, commandClass) {
        __classPrivateFieldSet(this, _commands, __classPrivateFieldGet(this, _commands).filter(command => {
            return !(command.eventType === eventType && command.commandClass === commandClass);
        }));
        if (!__classPrivateFieldGet(this, _commands).filter(command => command.eventType === eventType).length) {
            this.removeEventListener(eventType, __classPrivateFieldGet(this, _executeCommand));
        }
        return this;
    }
    /**
     * Map class instance to a property name
     */
    mapSingleton(propertyName, singletonClass, ...args) {
        if (!propertyName)
            throw new Error('propertyName cannot be undefined');
        __classPrivateFieldGet(this, _singletons)[propertyName] = typeof singletonClass === 'function'
            ? new singletonClass(...args)
            : __classPrivateFieldGet(this, _singletons)[propertyName] = singletonClass;
        return this;
    }
    /**
     * Unmap class instance from a property name
     */
    unmapSingleton(propertyName) {
        if (!propertyName)
            throw new Error('propertyName cannot be undefined');
        delete __classPrivateFieldGet(this, _singletons)[propertyName];
        return this;
    }
    /**
     * Map constant value to a property name
     */
    mapConstant(propertyName, value) {
        return this.mapSingleton(propertyName, value);
    }
    /**
     * Unmap constant value from a property name
     */
    unmapConstant(propertyName) {
        return this.unmapSingleton(propertyName);
    }
    /**
     * Inject constants and singleton instances into specified object
     */
    inject(obj, ...propertyNames) {
        if (!propertyNames.length) {
            propertyNames = Object.keys(obj);
        }
        for (const propertyName in __classPrivateFieldGet(this, _singletons)) {
            if (propertyNames.indexOf(propertyName) !== -1) {
                const value = __classPrivateFieldGet(this, _singletons)[propertyName];
                Object.defineProperty(obj, propertyName, {
                    configurable: true,
                    get: function () { return value; }
                });
            }
        }
        return obj;
    }
    /**
     * Set constants and singleton instances on the specified object to undefined
     */
    uninject(obj, ...propertyNames) {
        if (!propertyNames.length) {
            propertyNames = Object.keys(obj);
        }
        for (const propertyName in __classPrivateFieldGet(this, _singletons)) {
            if (propertyNames.indexOf(propertyName) !== -1) {
                delete obj[propertyName];
            }
        }
        return obj;
    }
}
exports.Context = Context;
_commands = new WeakMap(), _singletons = new WeakMap(), _executeCommand = new WeakMap();
exports.default = Context;
