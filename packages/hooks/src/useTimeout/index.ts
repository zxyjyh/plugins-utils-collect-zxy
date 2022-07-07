//@ts-nocheck
import { tryOnScopeDispose } from "@vueuse/core";

export const useTimeout = (): {
  registerTimeout: Function;
  unregisterTimeout: Function;
} => {
  let timer: number;

  const registerTimeout = (fn, delay: number) => {
    unregisterTimeout();
    timer = window.setTimeout(fn, delay);

    return unregisterTimeout;
  };

  const unregisterTimeout = () => {
    timer && window.clearTimeout(timer);
  };

  tryOnScopeDispose(() => unregisterTimeout());

  return {
    registerTimeout,
    unregisterTimeout,
  };
};
