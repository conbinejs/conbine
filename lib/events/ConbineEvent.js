"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConbineEvent = void 0;
/**
 * Base class for events dispatched by Conbine's EventDispatcher
 * You should extend this class to create events that require custom data or properties
 *
 * @author	Neil Rackett
 */
class ConbineEvent {
    /**
     * @param	{string}	type
     * @param	{[*]}		  data 	Event related data (optional)
     */
    constructor(type, data = null) {
        if (!type) {
            throw new Error('Event type not specified');
        }
        this.type = type;
        this.data = data;
        this.target = null;
    }
}
exports.ConbineEvent = ConbineEvent;
exports.default = ConbineEvent;
