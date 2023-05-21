/**
 * Experimental class decorator to enable automatic property injection
 * @author	Neil Rackett
 */
export function Injectable(target) {
    return class extends target {
        constructor(...args) {
            super(...args);
            // @ts-ignore
            this.context?.inject(this);
        }
    };
}
