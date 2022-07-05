"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseVirtualList = void 0;
//@ts-nocheck
var vue_1 = require("vue");
var core_1 = require("@vueuse/core");
var UseVirtualList = function (list, options) {
    var containerRef = (0, vue_1.ref)();
    var size = (0, core_1.useElementSize)(containerRef);
    var currentList = (0, vue_1.ref)([]);
    var source = (0, vue_1.shallowRef)(list);
    var state = (0, vue_1.ref)({ start: 0, end: 10 });
    var itemHeight = options.itemHeight, _a = options.overscan, overscan = _a === void 0 ? 5 : _a;
    var getViewCapacity = function (containerHeight) {
        return Math.ceil(containerHeight / itemHeight);
    };
    var getOffset = function (scrollTop) {
        return Math.floor(scrollTop / itemHeight);
    };
    var calculateRang = function () {
        var el = containerRef.value;
        if (el) {
            var offset = getOffset(el.scrollTop);
            var viewCap = getViewCapacity(el.clientHeight);
            var from = offset - overscan;
            var to = offset + viewCap + overscan;
            state.value = {
                start: from < 0 ? 0 : from,
                end: to > source.value.length ? source.value.length : to
            };
            currentList.value = source.value
                .slice(state.value.start, state.value.end)
                .map(function (el, index) { return ({ data: el, index: index + state.value.start }); });
        }
    };
    (0, vue_1.watch)([size.width, size.height, list], function () {
        calculateRang();
    });
    var totalHeight = (0, vue_1.computed)(function () {
        return itemHeight * source.value.length;
    });
    var getDistanceTop = function (index) {
        return index * itemHeight;
    };
    var scrollTo = function (index) {
        if (containerRef.value) {
            containerRef.value.scrollTop = getDistanceTop(index);
            calculateRang();
        }
    };
    var offsetTop = (0, vue_1.computed)(function () { return getDistanceTop(state.value.start); });
    var wrapperProps = (0, vue_1.computed)(function () {
        return {
            style: {
                width: '100%',
                height: "".concat(totalHeight.value - offsetTop.value, "px"),
                marginTop: "".concat(offsetTop.value, "px")
            }
        };
    });
    var containerStyle = { overflowY: 'auto' };
    return {
        list: currentList,
        scrollTo: scrollTo,
        containerProps: {
            ref: containerRef,
            onScroll: function () {
                calculateRang();
            },
            style: containerStyle,
        },
        wrapperProps: wrapperProps
    };
};
exports.UseVirtualList = UseVirtualList;
//# sourceMappingURL=index.js.map