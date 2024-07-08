import React, { Ref } from 'react';
import { ICoordinate, IOverlayContent, IXcMapCommon } from "../types/xc-map.ts";
import { Options } from "ol/Overlay";
export interface IOverlayComponentProps<TData> extends IXcMapCommon, Options {
    PopupContent: React.ComponentType<IOverlayContent<TData>>;
    additionalProps?: Partial<IOverlayContent<TData>>;
    onHideCallback?: () => void;
}
export interface IOverlayComponentApis {
    showPopup: (coordinate: ICoordinate) => void;
    hidePopup: () => void;
}
declare const _default: <TData>(props: IOverlayComponentProps<TData> & {
    ref?: Ref<IOverlayComponentApis>;
}) => React.JSX;
export default _default;