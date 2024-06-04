/**
 * Optional base class for mapped singletons to facilitate automatic property injection
 *
 * @see Context.mapSingleton
 * @author	Neil Rackett
 */
export class Actor {
    constructor(options) {
        this.context = options.context;
    }
}
