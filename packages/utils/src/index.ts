//@ts-nocheck
import get from "lodash/get";

import set from "lodash/set";

import type { Entries } from "type-fest";

type Callback = (argv?: any) => void;

/**
 * @param  {any[]} sourceArr
 * @param  {(argv:any)=>void} cb
 * @param  {number} count=1
 * @param  {number} wait=200
 */
export const timerChunk = (
  sourceArr: any[],
  cb: Callback,
  count = 1,
  wait = 200
) => {
  let ret: any;
  let timer: any = null;

  const renderData = () => {
    for (let index = 0; index < Math.min(count, sourceArr.length); index++) {
      ret = sourceArr.shift();
    }
    cb(ret);
  };

  return () => {
    if (!timer) {
      timer = setInterval(() => {
        if (sourceArr.length === 0) {
          clearImmediate(timer);
          ret = null;
          return;
        }

        renderData();
      }, wait);
    }
  };
};

/**
 * @param  {()=>void} callback
 */
export const memorize = (callback: Callback | null) => {
  let cache = false;
  let result: unknown = null;

  return () => {
    if (cache) {
      return result;
    } else {
      result = (callback as Callback)();
      cache = true;
      callback = null;
      return result;
    }
  };
};
/**
 * @param  {string|number|object|any[]} val
 */
export const isType = (val: string | number | object | any[]) => {
  return (type: string) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
};

/**
 * @description url formate
 * @param  {string} params
 */
export const formateUrl = (params: string) => {
  if (isType(params)("String")) {
    if (/^http(s)?/.test(params)) {
      const url = new URL(params);
      // 将参数转换成http://localhost:8080?a=1&b=2   -> {a:1,b:2}
      return Object.fromEntries(url.searchParams.entries());
    }
    // params如果为a=1&b=2,则转换成{a:1,b:2}
    return Object.fromEntries(new URLSearchParams(params).entries());
  }
};

/**
 * @description 懒加载可执行函数
 * @param  {Callback} cb
 */
export const lazyFunction = (factory: Callback) => {
  const fac: any = memorize(factory);

  const f = (...args: any[]) => fac(...args);

  return f;
};

/**
 * @description 数组去重
 * @param  {T[]} arr
 */
export const unique = <T>(arr: T[]) => [...new Set(arr)];

/**
 * @description 获取对象keys
 * @param  {T} arr
 */
export const keysof = <T>(arr: T) => Object.keys(arr) as Array<keyof T>;

/*
 * @description 获取对象keys
 * @param  {} arr
 * @param  {} =>Object.entries(arr)
 */
export const entriesOf = <T>(arr) => Object.entries(arr) as Entries<T>;

/**
 * @description 获取对象value 响应式
 * @param  {Record<string} obj
 * @param  {} any>
 * @param  {<string>[]} path
 * @param  {any} defaultValue?
 * @returns T
 */
export const getProps = <T = any>(
  obj: Record<string, any>,
  path: Array<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },

    set value(val: any) {
      set(obj, path, val);
    },
  };
};

/**
 */
export const noop = () => {};

/**
 * @description 获取uuid
 */
export const uuid = (): number => Math.floor(Math.random() * 10000);

export type Nullable<T> = T | null;

export type Arrayable<T> = T | T[];

export type Awaitable<T> = Promise<T> | T;

export const isBrowser = typeof window !== "undefined" && window !== null;

export const getDPR = (scale = 1): number =>
  isBrowser ? window.devicePixelRatio || scale : scale;

/**
 * @description 图片加载
 * @param  {} item
 * @param  {Function} resolve
 * @param  {Function} reject
 */
export const loadImageAsync = (item, resolve: Function, reject: Function) => {
  let image: HTMLImageElement | null = new Image();

  if (!item || !item.src) {
    return reject(new Error("image src is required"));
  }

  if (item.cors) {
    image.crossOrigin = item.cors;
  }

  image.src = item.src;

  image.onload = () => {
    resolve({
      naturalHeight: image!.naturalHeight,
      naturalWidth: image!.naturalWidth,
      src: image!.src,
    });
    image = null;
  };

  image.onerror = (e) => {
    reject(e);
  };
};
/**
 * @description
 * @param  {HTMLElement} el
 * @param  {'overflow'|'overflowY'|'overflowX'} prop
 */
export const getStyle = (el: HTMLElement, prop): string => {
  return typeof window.getComputedStyle !== "undefined"
    ? getComputedStyle(el, null).getPropertyValue(prop)
    : el.style[prop];
};

export const getOverflow = (el: HTMLElement) => {
  return (
    getStyle(el, "overflow") +
    getStyle(el, "overflowY") +
    getStyle(el, "overflowX")
  );
};

/**
 * @description 获取滚动父元素
 * @param  {HTMLElement} el
 */
export const getScrollParent = (el: HTMLElement) => {
  if (!isBrowser) return;

  if (!(el instanceof Element)) {
    return window;
  }

  let parent = el;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) break;
    if (!parent.parentNode) break;

    if (/(scroll|auto)/.test(getOverflow(parent))) return parent;

    parent = parent.parentNode as HTMLElement;
  }

  return window;
};

export const isObject = (obj: any): boolean => {
  return obj !== null && typeof obj === "object";
};

export class ImageCache {
  max: number;
  _caches: Set<string>;

  constructor(max: number) {
    this.max = max || 100;
    this._caches = new Set();
  }

  has(key: string): boolean {
    return this._caches.has(key);
  }

  add(key: string) {
    if (this.has(key)) return;
    this._caches.add(key);

    if (this._caches.size > this.max) {
      this.free();
    }
  }

  delete(key) {
    this._caches.delete(key);
  }

  free() {
    this._caches.clear();
  }
}

// 缓存 + 类型
const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

//函数柯里化目的
//参数分批次传入
//一个功能一次调用
//函数全局自调用=》需要全局的变量做参数=》缓存cache=>少用一个全局变量
//一个函数满足3个功能
// cache 缓存
// thing 是什么类型
// type  是否是某个值（判断是否相等）

function kindOfTest(type) {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
}

function typeOfTest(type) {
  return (thing) => {
    return typeof thing === type;
  };
}

export const isDate = kindOfTest("Date");

//封装逻辑，等到函数调用才能拿到结果
export const isUndefined = typeOfTest("undefined");
// isUndefined(a)

// {
//   k1: v1,
//   k2: v2,
//   k3: v3
// }
// 函数多次调用，参数用对象存储，批量化调用
// 批量化处理（多个值，多个对应关系）数据结构存储考虑用对象 key value
export const forEach = (obj, fn, { allOwnKeys = false } = {}) => {
  if (Array.isArray(obj)) {
    return obj.forEach((el, index) => fn.call(null, el, index, obj));
  }

  if (obj.isObject(obj)) {
    const arr = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    arr.forEach((el, index) => fn.call(null, el, index, obj));
  }
};

export const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

export const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Creating a function that will check if an object has a property. */
export const hasOwnProperty = ((_hasOwnProperty) => {
  return (obj, prop) => {
    _hasOwnProperty.call(obj, prop);
  };
})(Object.prototype.hasOwnProperty);
