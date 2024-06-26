import { ILayerCommon, IXcMapCommon } from "../types/xc-map";
export interface ICommonProps extends IXcMapCommon, ILayerCommon {
}
declare const Common: ({ mapId, layerName, visible }: ICommonProps) => null;
export default Common;
