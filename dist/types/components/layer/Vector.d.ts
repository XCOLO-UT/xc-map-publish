import { Options } from "ol/layer/BaseVector";
import { IXcMapCommonProps } from "../types/xc-map";
export interface IVectorProps extends Options<any>, IXcMapCommonProps {
    featureName?: string;
    pkField?: string;
}
declare const Vector: ({ xcMap, layerName, layerTag, source, pkField, featureName, minZoom, maxZoom, ...rest }: IVectorProps) => null;
export default Vector;
