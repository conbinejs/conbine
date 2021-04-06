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
var _commands;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const EventDispatcher_1 = require("../events/EventDispatcher");
/**
 * Application context (event bus)
 * @author  Neil Rackett
 */
class Context extends EventDispatcher_1.EventDispatcher {
    constructor() {
        super();
        _commands.set(this, void 0);
        __classPrivateFieldSet(this, _commands, []);
        this._executeCommand = this._executeCommand.bind(this);
    }
    mapCommand(eventType, commandClass) {
        this.unmapCommand(eventType, commandClass);
        this.addEventListener(eventType, this._executeCommand);
        __classPrivateFieldGet(this, _commands).push({ eventType, commandClass });
        return this;
    }
    unmapCommand(eventType, commandClass) {
        __classPrivateFieldSet(this, _commands, __classPrivateFieldGet(this, _commands).filter(command => {
            return !(command.eventType === eventType && command.commandClass === commandClass);
        }));
        if (!__classPrivateFieldGet(this, _commands).filter(command => command.eventType === eventType).length) {
            this.removeEventListener(eventType, this._executeCommand);
        }
        return this;
    }
    _executeCommand(event) {
        const commands = __classPrivateFieldGet(this, _commands).filter(command => command.eventType === event.type);
        commands.forEach(command => {
            const cmd = new command.commandClass();
            cmd.execute(event);
        });
    }
}
exports.Context = Context;
_commands = new WeakMap();
exports.default = Context;
