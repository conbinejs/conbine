var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Context_commands, _Context_singletons;
import { EventDispatcher } from "../events/EventDispatcher";
import { Actor } from "../services/Actor";
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
export class Context extends EventDispatcher {
    constructor() {
        super(...arguments);
        _Context_commands.set(this, []);
        _Context_singletons.set(this, {});
        this.executeCommand = (event) => {
            const commands = __classPrivateFieldGet(this, _Context_commands, "f").filter(command => command.eventType === event.type);
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
        __classPrivateFieldGet(this, _Context_commands, "f").push({ eventType, commandClass });
        return this;
    }
    /**
     * Unmap specified Command class from given event
     */
    unmapCommand(eventType, commandClass) {
        __classPrivateFieldSet(this, _Context_commands, __classPrivateFieldGet(this, _Context_commands, "f").filter(command => {
            return !(command.eventType === eventType && command.commandClass === commandClass);
        }), "f");
        if (!__classPrivateFieldGet(this, _Context_commands, "f").filter(command => command.eventType === eventType).length) {
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
        __classPrivateFieldGet(this, _Context_singletons, "f")[propertyName] = typeof singletonClass === 'function'
            ? new singletonClass(...args)
            : __classPrivateFieldGet(this, _Context_singletons, "f")[propertyName] = singletonClass;
        return this;
    }
    /**
     * Unmap class instance from a property name
     */
    unmapSingleton(propertyName) {
        if (!propertyName)
            throw new Error('propertyName cannot be undefined');
        delete __classPrivateFieldGet(this, _Context_singletons, "f")[propertyName];
        return this;
    }
    /**
     * Map constant value to a property name
     */
    mapConstant(propertyName, value) {
        if (!propertyName)
            throw new Error('propertyName cannot be undefined');
        __classPrivateFieldGet(this, _Context_singletons, "f")[propertyName] = value;
        return this;
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
        for (const key in __classPrivateFieldGet(this, _Context_singletons, "f")) {
            if (keys.includes(key)) {
                const value = __classPrivateFieldGet(this, _Context_singletons, "f")[key];
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
        for (const key in __classPrivateFieldGet(this, _Context_singletons, "f")) {
            if (keys.includes(key)) {
                delete obj[key];
            }
        }
        return obj;
    }
}
_Context_commands = new WeakMap(), _Context_singletons = new WeakMap();
export default Context;
