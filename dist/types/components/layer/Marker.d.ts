import { JSX, Ref } from "react";
import { ILayerCommonProps, IMarker, IXcMapCommonProps } from "../types/xc-map";
export interface IMarkerProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    markers?: IMarker<TData>[];
    getMarkerLabel?: (data: TData) => string;
}
export interface IMarkerApis<TData> {
    setMarkerPosition: (marker: IMarker<TData>) => void;
    setMarkerStyle: (marker: IMarker<TData>) => void;
}
declare const _default: <TData>(props: IMarkerProps<TData> & {
    ref?: Ref<IMarkerApis<TData>>;
}) => JSX.Element;
export default _default;
