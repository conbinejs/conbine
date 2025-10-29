import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Actor } from '../src/services/Actor';
import { Context } from '../src/core/Context';
import { Command } from '../src/commands/Command';
import ConbineEvent from '../src/events/ConbineEvent';

class TestContext extends Context {
  constructor() {
    super();

    this
      .mapConstant('testConstant', 'injectedValue')
      .mapConstant('anotherConstant', 42)
      .mapCommand('testEvent', TestCommand);
  }
}

class TestActor extends Actor {
  // Injected constants - set undefined to enable auto-injection, no value needed for named injection
  public testConstant?: string = undefined;
  public anotherConstant?: number = undefined;

  constructor(options: any) {
    super(options);
    this.context.inject(this);
  }

  dispatchTestEvent() {
    this.context.dispatchEvent(new ConbineEvent('testEvent'));
  }
}

class TestCommand extends Command<ConbineEvent> {
  async execute() {
    // Mock listener will be called
  }
}

describe('Actor', () => {
  let context: Context;
  let mockListener: any;

  beforeEach(() => {
    context = new Context();
    mockListener = vi.fn();
  });

  it('should instantiate with context', () => {
    const actor = new Actor({ context });
    expect(actor).toBeInstanceOf(Actor);
    expect(actor.context).toBe(context);
  });

  it('should inject constants and execute commands', () => {
    const testContext = new TestContext();
    const actor = new TestActor({ context: testContext });

    expect(actor.testConstant).toBe('injectedValue');
    expect(actor.anotherConstant).toBe(42);

    const mockCommandListener = vi.fn();
    class MockTestCommand extends Command<ConbineEvent> {
      async execute() {
        mockCommandListener();
      }
    }

    testContext.mapCommand('testEvent', MockTestCommand);
    actor.dispatchTestEvent();
    expect(mockCommandListener).toHaveBeenCalled();
  });
});