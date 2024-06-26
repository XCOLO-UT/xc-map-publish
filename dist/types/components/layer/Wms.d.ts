import { ILayerCommon, IWmsParam, IXcMapCommon } from "../types/xc-map";
export interface IWmsProps extends IXcMapCommon, ILayerCommon {
    url: string;
    params: IWmsParam;
    zoomParams: IWmsParam[];
}
declare const Wms: ({ mapId, layerName, layerTag, visible, url, params, minZoom, maxZoom, zoomParams }: IWmsProps) => JSX.Element;
export default Wms;
