import { ILayerCommonProps, IXcMapCommonProps } from "../types/xc-map";
export interface ICommonProps extends IXcMapCommonProps, ILayerCommonProps {
}
declare const Common: ({ mapId, layerName, visible }: ICommonProps) => null;
export default Common;
