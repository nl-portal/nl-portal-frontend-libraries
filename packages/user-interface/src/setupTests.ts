// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

type StorageLike = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem" | "clear" | "key"
> & { length: number };

const createStorageMock = (): StorageLike => {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: () => {
      store.clear();
    },
    getItem: (key: string) => store.get(String(key)) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(String(key));
    },
    setItem: (key: string, value: string) => {
      store.set(String(key), String(value));
    },
  };
};

const ensureStorage = (name: "localStorage" | "sessionStorage") => {
  const target = globalThis as Record<string, unknown>;
  const value = target[name] as Partial<Storage> | undefined;

  if (
    !value ||
    typeof value.getItem !== "function" ||
    typeof value.setItem !== "function" ||
    typeof value.removeItem !== "function" ||
    typeof value.clear !== "function"
  ) {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value: createStorageMock(),
      writable: true,
    });
  }
};

ensureStorage("localStorage");
ensureStorage("sessionStorage");

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(globalThis, "ResizeObserver", {
    configurable: true,
    value: ResizeObserverMock,
    writable: true,
  });
}
