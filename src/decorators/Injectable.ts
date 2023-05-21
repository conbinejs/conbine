import Context from "../core/Context";
import { IInjectable } from "./IInjectable";

/**
 * Experimental class decorator to enable automatic property injection
 * @author	Neil Rackett
 */
export function Injectable<T extends { new(...args: any[]): {}; }>(target: T): any {

	return class extends target implements IInjectable {

		public context!: Context;

		constructor(...args: any[]) {
			super(...args);
			if (this.context instanceof Context) {
				this.context.inject(this);
			} else {
				console.info(`[${target.name}] Injectable class decorator can only be used with classes that implement IInjectable`);
			}
		}
	};

}