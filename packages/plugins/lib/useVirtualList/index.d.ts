import { Ref } from 'vue';
export interface UseVirtualListOptions {
    itemHeight: number;
    overscan?: number;
}
export interface UseVirtualListItem<T> {
    data: T;
    index: number;
}
export declare const UseVirtualList: (list: [], options: UseVirtualListOptions) => {
    list: Ref<UseVirtualListItem<T>[]>;
    scrollTo: (index: number) => void;
    containerProps: {
        ref: Ref<any>;
        onScroll: () => void;
        style: Partial<CSSStyleDeclaration>;
    };
    wrapperProps: import("vue").ComputedRef<{
        style: {
            width: string;
            height: string;
            marginTop: string;
        };
    }>;
};
