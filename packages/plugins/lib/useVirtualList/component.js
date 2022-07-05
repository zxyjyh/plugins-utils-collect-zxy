"use strict";
//@ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseVirtualListComp = void 0;
var index_1 = require("./index");
var vue_1 = require("vue");
exports.UseVirtualListComp = (0, vue_1.defineComponent)({
    name: 'UseVirtualList',
    props: ['list', 'options', 'height'],
    setup: function (props, ctx) {
        var listRef = (0, vue_1.toRefs)(props).list;
        var _a = (0, index_1.UseVirtualList)(listRef, props.options), list = _a.list, containerProps = _a.containerProps, wrapperProps = _a.wrapperProps;
        return function () { return (0, vue_1.h)('div', __assign({}, containerProps), [
            (0, vue_1.h)('div', __assign({}, wrapperProps.value), list.value.map(function (item) { return (0, vue_1.h)('div', { style: { overFlow: 'hidden', height: item.height } }, ctx.slots.default ? ctx.slots.default(item) : 'Please set content!'); }))
        ]); };
    }
});
//# sourceMappingURL=component.js.map