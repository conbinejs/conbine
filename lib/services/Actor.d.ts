import Context from "../core/Context";
import { IInjectable } from "../decorators/IInjectable";
interface IActorOptions {
    context: Context;
}
/**
 * Optional base class for mapped singletons to facilitate automatic property injection
 *
 * @see Context.mapSingleton
 * @author	Neil Rackett
 */
export declare class Actor implements IInjectable {
    context: Context;
    constructor(options: IActorOptions);
}
export {};
