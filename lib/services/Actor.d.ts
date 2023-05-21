import Context from "../core/Context";
interface IActorOptions {
    context: Context;
}
/**
 * Optional base class for mapped singletons to facilitate automatic property injection
 *
 * @see Context.mapSingleton
 * @author	Neil Rackett
 */
export declare class Actor {
    protected context: Context;
    constructor(options: IActorOptions);
}
export {};
