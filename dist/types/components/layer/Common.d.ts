import { ILayerCommonProps, IXcMapCommonProps } from "../types/xc-map";
export interface ICommonProps extends IXcMapCommonProps, ILayerCommonProps {
}
declare const Common: ({ xcMap, layerName, visible }: ICommonProps) => null;
export default Common;
