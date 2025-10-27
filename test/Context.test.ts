import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Context } from "../src/core/Context";
import { Command } from "../src/commands/Command";
import ConbineEvent from "../src/events/ConbineEvent";

describe("Context", () => {
  let context: Context;

  beforeEach(() => {
    context = new Context();
  });

  it("should map and call a command", () => {
    const mockListener = vi.fn();
    class TestCommand extends Command<ConbineEvent> {
      async execute() {
        mockListener();
      }
    }
    context.mapCommand("testEvent", TestCommand);
    context.dispatchEvent(new ConbineEvent("testEvent"));
    expect(mockListener).toHaveBeenCalled();
  });

  it("should map and inject a singleton", () => {
    class TestSingleton { }

    let target: any = {};
    context.mapSingleton("testSingleton", TestSingleton);
    context.inject(target, "testSingleton");
    expect(target.testSingleton).toBeInstanceOf(TestSingleton);
  });

  it("should map and inject a constant", () => {
    const target: any = {};
    context.mapConstant("testConstant", 123);
    context.inject(target, "testConstant");
    expect(target.testConstant).toBe(123);
  });

  it("should inject and uninject values", () => {
    context.mapConstant("foo", "bar");
    const target: any = {};
    context.inject(target, "foo");
    expect(target.foo).toBe("bar");
    context.uninject(target, "foo");
    expect(target.foo).toBeUndefined();
  });
});
