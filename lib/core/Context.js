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
var _commands, _singletons;
import { EventDispatcher } from "../events/EventDispatcher";
import { Actor } from "../services/Actor";
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export class Context extends EventDispatcher {
    constructor() {
        super(...arguments);
        _commands.set(this, []);
        _singletons.set(this, {});
        this.executeCommand = (event) => {
            const commands = __classPrivateFieldGet(this, _commands).filter(command => command.eventType === event.type);
            commands.forEach(command => {
                const cmd = new command.commandClass({ event, context: this });
                cmd.execute();
            });
        };
    }
    /**
     * Map specified Command class the given event
     */
    mapCommand(eventType, commandClass) {
        this.unmapCommand(eventType, commandClass);
        this.addEventListener(eventType, this.executeCommand);
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
            this.removeEventListener(eventType, this.executeCommand);
        }
        return this;
    }
    /**
     * Map class instance to a property name
     */
    mapSingleton(propertyName, singletonClass, ...args) {
        if (!propertyName)
            throw new Error('propertyName cannot be undefined');
        if (Actor.isPrototypeOf(singletonClass)) {
            args[0] = Object.assign(args[0] ?? {}, { context: this });
        }
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
    inject(target, ...keys) {
        if (!keys.length) {
            keys = Object.keys(target);
        }
        for (const key in __classPrivateFieldGet(this, _singletons)) {
            if (keys.includes(key)) {
                const value = __classPrivateFieldGet(this, _singletons)[key];
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
    uninject(obj, ...keys) {
        if (!keys.length) {
            keys = Object.keys(obj);
        }
        for (const key in __classPrivateFieldGet(this, _singletons)) {
            if (keys.includes(key)) {
                delete obj[key];
            }
        }
        return obj;
    }
}
_commands = new WeakMap(), _singletons = new WeakMap();
export default Context;
