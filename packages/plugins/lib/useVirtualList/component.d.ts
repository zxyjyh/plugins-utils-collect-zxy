import { UseVirtualListOptions } from './index';
export interface UseVirtualListProps {
    list: [];
    options: UseVirtualListOptions;
    height: string;
}
export declare const UseVirtualListComp: import("vue").DefineComponent<Readonly<{
    height?: any;
    options?: any;
    list?: any;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    height?: any;
    options?: any;
    list?: any;
}>>>, {
    readonly height?: any;
    readonly options?: any;
    readonly list?: any;
}>;
