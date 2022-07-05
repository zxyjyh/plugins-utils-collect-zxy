"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyFunction = exports.formateUrl = exports.isType = exports.memorize = exports.timerChunk = void 0;
/**
 * @param  {any[]} sourceArr
 * @param  {(argv:any)=>void} cb
 * @param  {number} count=1
 * @param  {number} wait=200
 */
var timerChunk = function (sourceArr, cb, count, wait) {
    if (count === void 0) { count = 1; }
    if (wait === void 0) { wait = 200; }
    var ret;
    var timer = null;
    var renderData = function () {
        for (var index = 0; index < Math.min(count, sourceArr.length); index++) {
            ret = sourceArr.shift();
        }
        cb(ret);
    };
    return function () {
        if (!timer) {
            timer = setInterval(function () {
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
exports.timerChunk = timerChunk;
/**
 * @param  {()=>void} callback
 */
var memorize = function (callback) {
    var cache = false;
    var result = null;
    return function () {
        if (cache) {
            return result;
        }
        else {
            result = callback();
            cache = true;
            callback = null;
            return result;
        }
    };
};
exports.memorize = memorize;
/**
 * @param  {string|number|object|any[]} val
 */
var isType = function (val) {
    return function (type) {
        return Object.prototype.toString.call(val) === "[object ".concat(type, "]");
    };
};
exports.isType = isType;
/**
 * @param  {string} params
 */
var formateUrl = function (params) {
    if ((0, exports.isType)(params)('String')) {
        if (/^http(s)?/.test(params)) {
            var url = new URL(params);
            // 将参数转换成http://localhost:8080?a=1&b=2   -> {a:1,b:2}
            return Object.fromEntries(url.searchParams.entries());
        }
        // params如果为a=1&b=2,则转换成{a:1,b:2}
        return Object.fromEntries(new URLSearchParams(params).entries());
    }
};
exports.formateUrl = formateUrl;
/**
 * @description 懒加载可执行函数
 * @param  {Callback} cb
 */
var lazyFunction = function (factory) {
    var fac = (0, exports.memorize)(factory);
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fac.apply(void 0, args);
    };
    return f;
};
exports.lazyFunction = lazyFunction;
//# sourceMappingURL=index.js.map