/**
 * Experimental class decorator to enable automatic property injection for
 * classes that implement the IInjectable interface
 *
 * @author	Neil Rackett
 */
export declare function Injectable<T extends {
    new (...args: any[]): {};
}>(target: T): any;
