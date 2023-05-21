import Context from "./Context";
/**
 * Implemeting this interface enables automatic property injection using
 * the Injectable class decorator
 *
 * @author  Neil Rackett
 */
export interface IInjectable {
    context: Context;
}
