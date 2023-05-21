/**
 * Experimental class decorator to enable automatic property injection
 * @author	Neil Rackett
 */
export function Injectable<T extends { new(...args: any[]): {}; }>(target: T): any {
	return class extends target {
		constructor(...args: any[]) {
			super(...args);
			// @ts-ignore
			this.context?.inject(this);
		}
	};
}