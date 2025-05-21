import { ILayerCommonProps, IXcMapCommonProps } from "../types/xc-map";
export interface IXyzProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
}
declare const Xyz: ({ xcMap, url, layerName, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IXyzProps) => JSX.Element;
export default Xyz;
