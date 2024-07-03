import { JSX } from "react";
import { IAnyObject, ILayerCommon, ITrafficInfo, IXcMapCommon, IZoomUrls } from "../types/xc-map";
import { FeatureUrlFunction } from "ol/featureloader";
export interface IWfsProps extends IXcMapCommon, ILayerCommon {
    featureName?: string;
    pkField: string;
    url: string | FeatureUrlFunction;
    zoomUrls?: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getTrafficInfo?: (id: string) => ITrafficInfo | undefined;
}
declare const _default: <TData>(props: IWfsProps) => JSX.Element;
export default _default;
