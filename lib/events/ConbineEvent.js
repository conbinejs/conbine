/**
 * Base class for events dispatched by Conbine's EventDispatcher
 * You should extend this class to create events that require custom data or properties
 *
 * @author	Neil Rackett
 */
export class ConbineEvent {
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
export default ConbineEvent;
