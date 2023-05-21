/**
 * Experimental class decorator to enable automatic property injection
 * @author	Neil Rackett
 */
export declare function Injectable<T extends {
    new (...args: any[]): {};
}>(target: T): any;
