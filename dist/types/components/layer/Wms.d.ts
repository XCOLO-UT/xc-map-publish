import { ILayerCommonProps, IWmsParam, IXcMapCommonProps } from "../types/xc-map";
export interface IWmsProps extends IXcMapCommonProps, ILayerCommonProps {
    url: string;
    params: IWmsParam;
    zoomParams: IWmsParam[];
}
declare const Wms: ({ mapId, layerName, layerTag, visible, url, params, minZoom, maxZoom, zoomParams }: IWmsProps) => JSX.Element;
export default Wms;
