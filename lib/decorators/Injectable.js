import Context from "../core/Context";
/**
 * Experimental class decorator to enable automatic property injection
 * @author	Neil Rackett
 */
export function Injectable(target) {
    return class extends target {
        constructor(...args) {
            super(...args);
            if (this.context instanceof Context) {
                this.context.inject(this);
            }
            else {
                console.info(`[${target.name}] Injectable class decorator can only be used with classes that implement IInjectable`);
            }
        }
    };
}
