import { ILayerCommon, IXcMapCommon } from "../types/xc-map";
export interface IXyzProps extends IXcMapCommon, ILayerCommon {
    url: string;
}
declare const Xyz: ({ mapId, url, layerName, minZoom, maxZoom, }: IXyzProps) => JSX.Element;
export default Xyz;
