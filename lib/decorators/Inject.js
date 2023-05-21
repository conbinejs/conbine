export function Inject(target, key) {
    if (delete target[key]) {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            writable: true
        });
    }
}
