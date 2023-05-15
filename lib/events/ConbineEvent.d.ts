/**
 * Base class for events dispatched by Conbine's EventDispatcher
 * You should extend this class to create events that require custom data or properties
 *
 * @author	Neil Rackett
 */
export declare class ConbineEvent {
    type: string;
    data: any;
    target: any;
    /**
     * @param	{string}	type
     * @param	{[*]}		  data 	Event related data (optional)
     */
    constructor(type: string, data?: any);
}
export default ConbineEvent;
