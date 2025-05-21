import { ILayerCommonProps, IWmsParam, IXcMapCommonProps } from "../types/xc-map";
export interface IWmsProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
    params: IWmsParam;
    zoomParams: IWmsParam[];
}
declare const Wms: ({ xcMap, layerName, layerTag, visible, url, params, zoomParams, minZoom, maxZoom, zIndex, onLoadStart, onLoadEnd, }: IWmsProps) => JSX.Element;
export default Wms;
