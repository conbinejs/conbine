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
export class Actor {

  protected context: Context;

  constructor(options: IActorOptions) {
    this.context = options.context;
  }

}
