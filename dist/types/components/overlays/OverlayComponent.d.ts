import React, { Ref } from 'react';
import { ICoordinate, IOverlayChildrenProps, IXcMapCommonProps } from "../types/xc-map.ts";
import { Options } from "ol/Overlay";
export interface IOverlayComponentProps<TData> extends Pick<IXcMapCommonProps, 'mapId'>, Options {
    overlayId: string;
    children?: (props: IOverlayChildrenProps<TData>) => React.ReactNode;
    onHideCallback?: () => void;
}
export interface IOverlayComponentApis<TData> {
    showPopup: (coordinate: ICoordinate, datas: TData[], featureName: string) => void;
    hidePopup: () => void;
    setOverlayPosition: (coordinate: ICoordinate) => void;
}
declare const _default: <TData>(props: IOverlayComponentProps<TData> & {
    ref?: Ref<IOverlayComponentApis<TData>>;
}) => React.JSX;
export default _default;
