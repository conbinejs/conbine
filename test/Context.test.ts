import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Context } from "../src/core/Context";
import { Command } from "../src/commands/Command";
import ConbineEvent from "../src/events/ConbineEvent";

describe("Context", () => {
  let context: Context;

  beforeEach(() => {
    context = new Context();
  });

  it("should map, call and unmap a command", () => {
    const mockListener = vi.fn();
    class TestCommand extends Command<ConbineEvent> {
      async execute() {
        mockListener();
      }
    }
    context.mapCommand("testEvent", TestCommand);
    context.dispatchEvent(new ConbineEvent("testEvent"));
    expect(mockListener).toHaveBeenCalled();
    context.unmapCommand("testEvent", TestCommand);
    expect(context.hasCommand("testEvent", TestCommand)).toBe(false);
  });

  it("should map, inject and unmap a constant", () => {
    const target: any = {};
    context.mapConstant("testConstant", 123);
    context.inject(target, "testConstant");
    expect(target.testConstant).toBe(123);
    context.unmapConstant("testConstant");
    expect(context.hasConstant("testConstant")).toBe(false);
  });

  it("should map, inject and unmap a singleton", () => {
    class TestSingleton { }

    let target: any = {};
    context.mapSingleton("testSingleton", TestSingleton);
    context.inject(target, "testSingleton");
    expect(target.testSingleton).toBeInstanceOf(TestSingleton);
    context.unmapSingleton("testSingleton");
    expect(context.hasSingleton("testSingleton")).toBe(false);
  });

  it("should inject and uninject multiple values", () => {
    context.mapConstant("foo", "bar");
    const target: any = {};
    context.inject(target, "foo");
    expect(target.foo).toBe("bar");
    context.uninject(target, "foo");
    expect(target.foo).toBeUndefined();
  });
});
