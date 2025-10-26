import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventDispatcher } from '../src/events/EventDispatcher';
import ConbineEvent from '../src/events/ConbineEvent';

describe('EventDispatcher', () => {
  class TestEvent extends ConbineEvent {
    custom: string;
    constructor(type: string, custom: string) {
      super(type);
      this.custom = custom;
    }
  }

  let dispatcher: EventDispatcher<TestEvent>;

  beforeEach(() => {
    dispatcher = new EventDispatcher<TestEvent>();
  });

  it('Should add and dispatch event listeners', () => {
    const mockListener = vi.fn();
    dispatcher.addEventListener('test', mockListener);
    const event = new TestEvent('test', 'foo');
    dispatcher.dispatchEvent(event);
    expect(mockListener).toHaveBeenCalledWith(event);
  });

  it('Should remove event listeners', () => {
    const mockListener = vi.fn();
    dispatcher.addEventListener('test', mockListener);
    dispatcher.removeEventListener('test', mockListener);
    dispatcher.dispatchEvent(new TestEvent('test', 'bar'));
    expect(mockListener).not.toHaveBeenCalled();
  });

  it('Should support once option', () => {
    const mockListener = vi.fn();
    dispatcher.addEventListener('test', mockListener, { once: true });
    dispatcher.dispatchEvent(new TestEvent('test', 'foo'));
    dispatcher.dispatchEvent(new TestEvent('test', 'foo'));
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  it('Should remove all event listeners', () => {
    const mockListener = vi.fn();
    dispatcher.addEventListener('test1', mockListener);
    dispatcher.addEventListener('test2', mockListener);
    dispatcher.removeAllEventListeners();
    expect(dispatcher.hasEventListener('test1')).toBe(false);
    expect(dispatcher.hasEventListener('test2')).toBe(false);
  });

  it('Should remove all event listeners of specified type', () => {
    const mockListener1 = vi.fn();
    const mockListener2 = vi.fn();
    dispatcher.addEventListener('test', mockListener1);
    dispatcher.addEventListener('test', mockListener2);
    dispatcher.removeAllEventListeners('test');
    dispatcher.dispatchEvent(new TestEvent('test', 'foo'));
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).not.toHaveBeenCalled();
  });

  it('Should remove all event listeners in specified group', () => {
    const mockListener1 = vi.fn();
    const mockListener2 = vi.fn();
    dispatcher.addEventListener('test', mockListener1, { group: 'group1' });
    dispatcher.addEventListener('test', mockListener2, { group: 'group2' });
    dispatcher.removeAllEventListeners('test', { group: 'group2' });
    dispatcher.dispatchEvent(new TestEvent('test', 'foo'));
    expect(mockListener1).toHaveBeenCalled();
    expect(mockListener2).not.toHaveBeenCalled();
  });

  it('Should check for event listeners', () => {
    const mockListener = vi.fn();
    expect(dispatcher.hasEventListener('test')).toBe(false);
    dispatcher.addEventListener('test', mockListener);
    expect(dispatcher.hasEventListener('test')).toBe(true);
  });
});
