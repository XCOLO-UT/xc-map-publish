import { JSX, Ref } from "react";
import { IAnyObject, ILayerCommon, ITrafficInfo, IVector, IXcMapCommon, IZoomUrls } from "../types/xc-map";
export interface IWfsProps extends IXcMapCommon, ILayerCommon {
    featureName?: string;
    pkField: string;
    url: string;
    zoomUrls: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getTrafficInfo?: (id: string) => ITrafficInfo | undefined;
}
export interface IWfsApis<TData> {
    setVectorStyle: (vector: IVector<TData>) => void;
}
declare const _default: <TData>(props: IWfsProps & {
    ref?: Ref<IWfsApis<TData>>;
}) => JSX.Element;
export default _default;
