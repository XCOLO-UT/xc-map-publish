import { Options } from "ol/layer/BaseVector";
import { IXcMapCommon } from "../types/xc-map";
export interface IVectorProps extends Options<any>, IXcMapCommon {
    featureName?: string;
    pkField?: string;
}
declare const Vector: ({ mapId, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
export default Vector;
