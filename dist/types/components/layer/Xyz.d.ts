import { ILayerCommonProps, IXcMapCommonProps } from "../types/xc-map";
export interface IXyzProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
}
declare const Xyz: ({ mapId, url, layerName, minZoom, maxZoom, zIndex, onLoadEnd, }: IXyzProps) => JSX.Element;
export default Xyz;
