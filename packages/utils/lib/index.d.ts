declare type Callback = (argv?: any) => void;
/**
 * @param  {any[]} sourceArr
 * @param  {(argv:any)=>void} cb
 * @param  {number} count=1
 * @param  {number} wait=200
 */
export declare const timerChunk: (sourceArr: any[], cb: Callback, count?: number, wait?: number) => () => void;
/**
 * @param  {()=>void} callback
 */
export declare const memorize: (callback: Callback | null) => () => unknown;
/**
 * @param  {string|number|object|any[]} val
 */
export declare const isType: (val: string | number | object | any[]) => (type: string) => boolean;
/**
 * @param  {string} params
 */
export declare const formateUrl: (params: string) => {
    [k: string]: string;
};
/**
 * @description 懒加载可执行函数
 * @param  {Callback} cb
 */
export declare const lazyFunction: (factory: Callback) => (...args: any[]) => any;
export {};
