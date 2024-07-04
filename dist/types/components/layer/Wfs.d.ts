import { Feature } from "ol";
import { IAnyObject, IFeatureTypeStyle, ILayerCommon, ITrafficInfo, IXcMapCommon, IZoomUrls } from "../types/xc-map";
import { FeatureUrlFunction } from "ol/featureloader";
export interface IWfsProps extends IXcMapCommon, ILayerCommon {
    featureName?: string;
    pkField: string;
    url: string | FeatureUrlFunction;
    zoomUrls?: IZoomUrls[];
    getVectorLabel?: (data: IAnyObject) => string;
    getTrafficInfo?: (id: string) => ITrafficInfo | undefined;
    getCustomStyle?: (feature: Feature) => IFeatureTypeStyle | undefined;
    filter?: (feature: Feature) => boolean;
}
export interface IWfsApis {
    getWfsFeatures: () => Feature[];
    setVisible: (id: string, visible: boolean) => void;
}
declare const Wfs: any;
export default Wfs;
