import React, { Ref } from "react";
import { Feature } from "ol";
import { IAnyObject, IFeatureTypeStyle, ILayerCommonProps, IStatusInfo, IXcMapCommonProps, IZoomUrls } from "../types/xc-map";
import { FeatureUrlFunction } from "ol/featureloader";
export interface IWfsProps<TData> extends IXcMapCommonProps, ILayerCommonProps {
    featureName?: string;
    pkField: string;
    url: string | FeatureUrlFunction;
    zoomUrls?: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getStatusInfo?: (id: string) => IStatusInfo | undefined;
    getVectorValue?: (id: string) => TData | undefined;
    getCustomStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    filter?: (feature: Feature) => boolean;
    useBbox?: boolean;
}
export interface IWfsApis {
    getWfsFeatures: () => Feature[];
    setVisible: (id: string, visible: boolean) => void;
}
declare const _default: <TData>(props: IWfsProps<TData> & {
    ref?: Ref<IWfsApis>;
}) => React.JSX;
export default _default;
