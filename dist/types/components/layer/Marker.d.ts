import { Ref } from "react";
import { ILayerCommonProps, IMarker, IStatusInfo, IXcMapCommonProps } from "../types/xc-map";
export interface IMarkerProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    markers?: IMarker<TData>[];
    getMarkerLabel?: (data: TData) => string;
    getStatusInfo?: (id: string) => IStatusInfo | undefined;
}
export interface IMarkerApis<TData> {
    setMarkerPosition: (marker: IMarker<TData>) => void;
    setMarkerStyle: (marker: IMarker<TData>) => void;
}
declare const _default: <TData>(props: IMarkerProps<TData> & {
    ref?: Ref<IMarkerApis<TData>>;
}) => JSX.Element;
export default _default;
